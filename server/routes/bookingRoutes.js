const express = require('express');
const Booking = require('../models/Booking');
const { mongo } = require('mongoose');

const booking_router = express.Router();


booking_router.post('/add-booking', async (req, res) => {
  try {
    const { name, age, email, contact, travelers, special_req ,start_date, end_date, tour_title, tour_location} = req.body;

    const newBooking = new Booking({
      name,
      age,
      email,
      contact,
      travelers,
      special_req,
      start_date,
      end_date,
      tour_title,
      tour_location,
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(500).json({ message: 'Error adding tour', error: err.message });
  }
});

booking_router.get('/all-bookings',async(req,res)=>{

    try{
        const booking = await Booking.find();
        res.status(200).json(booking);
    }
    catch(err){
        res.status(500).json({message:'Error fetching bookings',details:err})
    }
})


module.exports = booking_router;
