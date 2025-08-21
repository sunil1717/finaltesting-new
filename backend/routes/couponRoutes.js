
const express = require('express');
const Coupon = require('../models/Coupon');

const router = express.Router();
const multer = require("multer");

const upload = multer();

//  Create Coupon (Admin use)
router.post("/add", upload.none(), async (req, res) => {
  try {
   
    const { code, discountType, discountValue, minimumAmount, expiryDate } = req.body;
    const newCoupon = new Coupon({ code, discountType, discountValue, minimumAmount, expiryDate });
    await newCoupon.save();
    res.json({ success: true, message: "Coupon added successfully", coupon: newCoupon });
  } catch (error) {
    console.error(" Error adding coupon:", error); 
    res.status(500).json({ success: false, message: error.message });
  }
});

//  Get All Coupons
router.get("/all", async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json({ success: true, coupons });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

//  Apply Coupon
router.post("/apply", async (req, res) => {
  try {
    const { code, totalAmount } = req.body;

    const coupon = await Coupon.findOne({ code });
    if (!coupon) return res.status(404).json({ success: false, message: "Invalid coupon" });

    // Expiry check
    if (new Date() > coupon.expiryDate) {
      return res.status(400).json({ success: false, message: "Coupon expired" });
    }

    // Minimum amount check
    if (totalAmount < coupon.minimumAmount) {
      return res.status(400).json({
        success: false,
        message: `Coupon valid only for orders above ₹${coupon.minimumAmount}`
      });
    }

    // Calculate discount
    let discount = 0;
    if (coupon.discountType === "percentage") {
      discount = (totalAmount * coupon.discountValue) / 100;
    } else {
      discount = coupon.discountValue;
    }

    const finalAmount = Math.max(totalAmount - discount, 0);

    res.json({
      success: true,
      discount,
      finalAmount,
      message: "Coupon applied successfully"
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

//  Delete Coupon by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Coupon deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
