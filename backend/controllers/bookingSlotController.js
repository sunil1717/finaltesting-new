// controllers/bookingController.js
const BookingSlot = require("../models/BookingSlot");




// Default capacity for phases
const defaultCapacity = {
  morning: 3,
  lunch: 3,
  afternoon: 3,
  flexible: 1,
};

// Book a slot (create if not exist, otherwise decrease)
const bookSlot = async (req, res) => {
  try {
    const { date, phase } = req.body;

    if (!date || !phase) {
      return res.status(400).json({ success: false, message: "Date and phase are required" });
    }

    // check if slot already exists
    let slot = await BookingSlot.findOne({ date, phase });

    if (!slot) {
      // Default slot values
      let defaultAvailable = 0;
      if (["morning", "lunch", "afternoon"].includes(phase)) {
        defaultAvailable = 3;
      } else if (phase === "flexible") {
        defaultAvailable = 1;
      } else {
        return res.status(400).json({ success: false, message: "Invalid phase" });
      }

      // create with default - 1
      slot = new BookingSlot({
        date,
        phase,
        availableSlots: defaultAvailable - 1,
      });

      await slot.save();

      return res.status(201).json({
        success: true,
        message: `Slot created & booked for ${date} (${phase})`,
        data: slot,
      });
    }

    // if exists, check availability
    if (slot.availableSlots <= 0) {
      return res.status(400).json({ success: false, message: "Slot is fully booked" });
    }

    // decrease
    slot.availableSlots -= 1;
    await slot.save();

    res.status(200).json({
      success: true,
      message: `Slot booked for ${date} (${phase})`,
      data: slot,
    });
  } catch (error) {
    console.error("Error booking slot:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



// ✅ Check availability for a given date
const checkAvailability = async (req, res) => {
  try {
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({ success: false, message: "Date is required" });
    }

    // Fetch all slots already created for that date
    const slots = await BookingSlot.find({ date });

    // Build availability object for all phases
    const availability = {};

    // Start with default availability
    Object.keys(defaultCapacity).forEach((phase) => {
      availability[phase] = defaultCapacity[phase];
    });

    // Override with DB values if found
    slots.forEach((slot) => {
      availability[slot.phase.toLowerCase()] = slot.availableSlots;
    });

    res.status(200).json({
      success: true,
      date,
      availability,
    });
  } catch (error) {
    console.error("Error checking availability:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  bookSlot,
  checkAvailability
};

