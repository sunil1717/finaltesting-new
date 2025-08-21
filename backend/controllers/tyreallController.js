const Tyre = require("../models/Tyreall");
const cloudinary = require("../utils/cloudinary");
const multer = require("multer");




// Multer setup
const storage = multer.memoryStorage();
const uploads = multer({ storage });

const uploadBoth = uploads.fields([
  { name: "image", maxCount: 1 },
  { name: "brandLogo", maxCount: 1 }
]);

const uploadSingle = uploads.single("image");




const priceAdditions = {
  Premium: { 1: 210, 2: 160, 3: 140, 4: 110, 5: 120 },
  "Mid-Range": { 1: 200, 2: 150, 3: 130, 4: 100, 5: 110 },
  Budget: { 1: 190, 2: 140, 3: 115, 4: 85, 5: 90 },
};


//  Add a new tyre
const addTyre = async (req, res) => {
  try {
    const {
      Brand, SIZE, Model, Type,
      "LOAD/SPEED RATING": rating,
      Marking, RunFlat,
      "Price Incl GST": price,
      "In Stock": inStock,
      "UNLOADING IN 24 HRS": unloading,
      
      category,
    } = req.body;

    if (!Brand || !SIZE || !Model || !price || !inStock || !category) {
      return res.status(400).json({ error: "Required fields are missing" });
    }


     // Validate category
    const additions = priceAdditions[category];

    if (!additions) {
      return res.status(400).json({ error: "Invalid category provided" });
    }


      const basePrice = parseFloat(price);
      if (isNaN(basePrice)) {
  return res.status(400).json({ error: "Invalid price value" });
}

    // Calculate and round prices
    const price1 = Math.round(basePrice + additions[1]);
    const price2 = Math.round(basePrice + additions[2]);
    const price3 = Math.round(basePrice + additions[3]);
    const price4 = Math.round(basePrice + additions[4]);
    const price5 = Math.round(basePrice + additions[5]);

 // Tyre image
let imageUrl = "";
if (req.files && req.files.image) {
  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "tyres" },
      (err, result) => (err ? reject(err) : resolve(result))
    );
    stream.end(req.files.image[0].buffer);
  });
  imageUrl = result.secure_url;
}

// Brand logo upload
let brandLogoUrl = "";
if (req.files && req.files.brandLogo) {
  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "tyres/brand_logos" },
      (err, result) => (err ? reject(err) : resolve(result))
    );
    stream.end(req.files.brandLogo[0].buffer);
  });
  brandLogoUrl = result.secure_url;
}


    const tyre = new Tyre({
      Brand,
      SIZE,
      "LOAD/SPEED RATING": rating,
      Model,
      Type,
      Marking,
      RunFlat,
      "Price for 1": price1 ,
      "Price for 2": price2 ,
      "Price for 3": price3 ,
      "Price for 4": price4 ,
      "Price for 5": price5 ,
      "Price Incl GST": basePrice,
      "In Stock": inStock,
      "UNLOADING IN 24 HRS": unloading,
      image_url: imageUrl,
      brand_logo_url: brandLogoUrl,
      category
    });

    await tyre.save();
    res.status(201).json({ message: "Tyre added successfully", data: tyre });
  } catch (err) {
    res.status(500).json({ error: "Failed to add tyre", details: err.message });
  }
};


//delete tyre 


const deleteTyre = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Tyre.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Tyre not found" });
    }
    res.json({ message: "Tyre deleted successfully", data: deleted });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete tyre", details: error.message });
  }
};



// Get all tyres

const getAllTyres = async (req, res) => {
  try {


    const tyres = await Tyre.find();
    res.json(tyres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get tyres by size
// Search tyres by width/profile/rim
const getTyresBySize = async (req, res) => {
  try {
    const { width, profile, rim } = req.body;

    if (!width || !profile || !rim) {
      return res.status(400).json({ error: "Missing width, profile or rim" });
    }


    const sizePattern = new RegExp(`^${width}/${profile}R${rim}$`, "i");

    const tyres = await Tyre.find({ SIZE: sizePattern });
    res.json(tyres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Get tyres by brand 
const getTyresByBrand = async (req, res) => {
  try {
    const brand = req.params.brand;

    // Case-insensitive exact match
    const tyres = await Tyre.find({
      Brand: { $regex: new RegExp(`^${brand}$`, "i") }
    });

    res.status(200).json({ success: true, data: tyres });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



// Update "In Stock" count
const updateInStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { inStock } = req.body;
    const updated = await Tyre.findByIdAndUpdate(id, { "In Stock": String(inStock) }, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTyreImage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    // Upload new image to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "tyres" },
        (err, result) => (err ? reject(err) : resolve(result))
      );
      stream.end(req.file.buffer);
    });

    // Find the tyre by id to know its brand & model
    const tyre = await Tyre.findById(id);
    if (!tyre) {
      return res.status(404).json({ error: "Tyre not found" });
    }

    // Update all tyres with same Brand + Model
    const updated = await Tyre.updateMany(
      { Brand: tyre.Brand, Model: tyre.Model },
      { $set: { image_url: result.secure_url } }
    );

    res.json({
      message: "Image updated successfully for all matching tyres",
      updatedCount: updated.modifiedCount,
      newImage: result.secure_url,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to update image",
      details: error.message,
    });
  }
};


// Update tyre prices by admin
const updateTyrePrices = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = {};

    // Extract only relevant fields if they exist in request
    const allowedPriceFields = [
      "Price for 1",
      "Price for 2",
      "Price for 3",
      "Price for 4",
      "Price for 5"
    ];

    allowedPriceFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateFields[field] = req.body[field];
      }
    });

    const updated = await Tyre.findByIdAndUpdate(id, updateFields, { new: true });

    if (!updated) {
      return res.status(404).json({ error: "Tyre not found" });
    }

    res.json({ message: "Prices updated successfully", data: updated });
  } catch (error) {
    res.status(500).json({ error: "Failed to update prices", details: error.message });
  }
};

// get tyre details by slug 

const getTyreBySlug = async (req, res) => {
  try {
    const tyre = await Tyre.findOne({ slug: req.params.slug });
    if (!tyre) return res.status(404).json({ message: "Tyre not found" });
    res.json(tyre);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




// Parse SIZE string into width, profile, rim
function parseSize(sizeStr) {
  const match = sizeStr.match(/(\d+)\/(\d+)R(\d+)/);
  if (!match) return {};
  return { width: Number(match[1]), profile: Number(match[2]), rim: Number(match[3]) };
}

// Flexible search
 const searchTyres = async (req, res) => {
  try {
    const { width, profile, rim, runflat, brand, type ,speed_rating, load_index } = req.query;
    let query = {};

    // SIZE filter
    if (width || profile || rim) {
      const regexParts = [];
      if (width) regexParts.push(`^${width}`);
      if (profile) regexParts.push(`/${profile}R`);
      if (rim) regexParts.push(`${rim}$`);
      query.SIZE = { $regex: regexParts.join(''), $options: 'i' };
    }

    // RunFlat filter
   if (runflat) {
  if (runflat === "Yes") {
    query.RunFlat = "YES";
  } else if (runflat === "No") {
    query.$or = [
      { RunFlat: "NO" },
      { RunFlat: null },
      { RunFlat: "" },
      { RunFlat: { $exists: false } },
      { RunFlat: { $type: "double" } } // catches BSON Double(NaN)
    ];
  }
}

    // Brand filter
    if (brand) query.Brand = brand;

    // Type filter
    if (type) query.Type = { $in: Array.isArray(type) ? type : [type] };

     // Speed Rating filter (last character of LOAD/SPEED RATING)
    if (speed_rating) {
      query['LOAD/SPEED RATING'] = { $regex: `${speed_rating}$`, $options: 'i' };
     }

     // Load Index filter (number part of LOAD/SPEED RATING)
    if (load_index) {
      query['LOAD/SPEED RATING'] = { 
        $regex: `^${load_index}`, 
        $options: 'i' 
      };
    }

     // Combine both load_index & speed_rating if both exist
    if (load_index && speed_rating) {
      query['LOAD/SPEED RATING'] = { 
        $regex: `^${load_index}${speed_rating}$`, 
        $options: 'i' 
      };
    }

    const tyres = await Tyre.find(query);
    res.json(tyres);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = {
  getAllTyres,
  getTyresBySize,

  updateInStock,
  addTyre,
  deleteTyre,
  updateTyreImage,
  uploadBoth,
  uploadSingle,
  updateTyrePrices,
  getTyreBySlug,
  getTyresByBrand,

  searchTyres

};
