const express = require('express');

const Tour = require('../models/Tour');

const router = express.Router();


const adminCredentials = {
  username: 'admin',
  password: 'admin123' 
};


router.post('/login', async (req, res) => {

  const { username, password } = req.body;

  if (username === adminCredentials.username && password === adminCredentials.password) {
  
    return res.status(200).json({ message: 'Login successful' });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});


router.post('/add-tour', async (req, res) => {
  try {
    const { title, price, description, image, location } = req.body;

    const newTour = new Tour({
      title,
      price,
      description,
      image,
      location,
    });

    const savedTour = await newTour.save();
    res.status(201).json(savedTour);
  } catch (err) {
    res.status(500).json({ message: 'Error adding tour', error: err.message });
  }
});


router.delete('/delete-tour', async (req, res) => {
  const { tour_id } = req.query;
  if (!tour_id) {
    return res.status(400).json({ message: 'Tour ID is required' });
  }
  try {
    const tour = await Tour.findByIdAndDelete(tour_id);
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }
    res.status(200).json({ message: 'Tour deleted successfully', tour });
  } catch (err) {
    res.status(500).json({ message: 'Error occurred', details: err.message });
  }
});

router.delete('/delete-tour', async (req, res) => {
  const { tour_id } = req.query;

  try {

    const deletedTour = await Tour.findByIdAndDelete(tour_id);

    if (!deletedTour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    res.status(200).json({ message: 'Tour deleted successfully', deletedTour });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting tour', error: err.message });
  }
  
});

router.get('/get-tour/:tourId',async (req,res)=>{
  const {tourId} = req.params;
    try{
      const tour = await Tour.findById(tourId);
      res.status(200).json(tour);
    }
    catch(err){
      res.status(500).json({message: 'Error',details:err})
    }
});


router.put('/update-tour/:tourId', async (req, res) => {
  const { tourId } = req.params;
  const { title, location, description, price, image } = req.body;

  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      tourId,
      { title, location, description, price, image },
      { new: true }
    );

    if (!updatedTour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    res.status(200).json(updatedTour);
  } catch (error) {
    res.status(500).json({ message: 'Error updating tour', error: error.message });
  }
});



router.get('/all-tours', async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json(tours);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tours', error: err.message });
  }
});

router.get('/tour-location', async (req, res) => {
  const { location } = req.query;
  try {
    const tour_found = await Tour.find({ location: { $regex: location, $options: 'i' } });
    res.status(200).json(tour_found);
  } catch (err) {
    res.status(500).json({ error: 'Error finding tour', details: err.message });
  }
});

module.exports = router;
