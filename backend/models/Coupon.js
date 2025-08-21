const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },   // e.g., "SAVE10"
  discountType: { type: String, enum: ["percentage", "flat"], required: true },
  discountValue: { type: Number, required: true },        // 10% or ₹500
  minimumAmount: { type: Number, default: 0 },                // minimum order amount required
  expiryDate: { type: Date, required: true }
}, { timestamps: true });

module.exports= mongoose.model("Coupon", couponSchema);
