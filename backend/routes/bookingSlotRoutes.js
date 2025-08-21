// routes/bookingRoutes.js
const express = require("express");
const router = express.Router();

const {  bookSlot, checkAvailability } = require("../controllers/bookingSlotController");

// POST - create slots for a date
router.post("/create",  bookSlot);
router.post("/check", checkAvailability);

module.exports = router;
