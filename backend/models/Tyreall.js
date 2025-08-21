const mongoose = require("mongoose");
const slugify = require("slugify");

const TyreSchema = new mongoose.Schema({
  slug: { type: String, unique: true },
  Brand: { type: String },
  SIZE: { type: String },
  "LOAD/SPEED RATING": { type: String },
  Model: { type: String },
  Type: { type: String },
  Marking: { type: String, default: null },
  RunFlat: { type: String, default: null },

  "Price for 1": { type: Number, default: null },
  "Price for 2": { type: Number, default: null },
  "Price for 3": { type: Number, default: null },
  "Price for 4": { type: Number, default: null },
  "Price for 5": { type: Number, default: null },
  "Price Incl GST": { type: Number },

  "In Stock": { type: String },
  "UNLOADING IN 24 HRS": { type: Number },

  brand_logo_url: { type: String },
  category: { type: String },
  image_url: { type: String }
}, { collection: "tyre_data" });

// Match python-slugify behavior
TyreSchema.pre("save", async function(next) {
  if (this.isNew || this.isModified("Brand") || this.isModified("Model") || this.isModified("SIZE")) {
    let baseSlug = slugify(`${this.Brand || ""} ${this.Model || ""} ${this.SIZE || ""}`, {
      lower: true,       // lowercase
      strict: true,      // remove special characters except -
      locale: 'en',      // match python default
      trim: true
    });

    let slug = baseSlug;
    let counter = 1;

    // Ensure unique
    while (await mongoose.models.Tyreall.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    this.slug = slug;
  }
  next();
});

module.exports = mongoose.model("Tyreall", TyreSchema);
