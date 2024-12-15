const express = require('express');
const Booking = require('../models/Booking');

const booking_router = express.Router();


booking_router.post('/add-booking', async (req, res) => {
  try {
    const { name, age, email, contact, travelers, special_req ,start_date, end_date} = req.body;

    const newBooking = new Booking({
      name,
      age,
      email,
      contact,
      travelers,
      special_req,
      start_date,
      end_date
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(500).json({ message: 'Error adding tour', error: err.message });
  }
});


module.exports = booking_router;
