const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/tyreallController");

// Routes
router.get("/", getAllTyres);
router.post("/size", getTyresBySize);
router.get("/brand/:brand", getTyresByBrand);

router.put("/update-stock/:id", updateInStock);

router.post("/add", uploadBoth, addTyre);
router.put("/update-image/:id", uploadSingle, updateTyreImage);
router.delete("/delete/:id", deleteTyre);
router.put("/update-prices/:id", updateTyrePrices);
router.get("/fetch/:slug",getTyreBySlug);


router.get('/search', searchTyres);

module.exports = router;
