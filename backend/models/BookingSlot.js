
const mongoose = require("mongoose");

const bookingSlotSchema = new mongoose.Schema({
  date: {
    type: String, // store as "YYYY-MM-DD"
    required: true,
  },
  phase: {
    type: String,
    enum: ["morning", "lunch", "afternoon", "flexible"],
    required: true,
  },
  availableSlots: {
    type: Number,
    required: true,
  }
});

// Ensure a date+phase is unique
bookingSlotSchema.index({ date: 1, phase: 1 }, { unique: true });

module.exports = mongoose.model("BookingSlot", bookingSlotSchema);
