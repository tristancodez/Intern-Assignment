const express = require('express');
const session = require('express-session');
const Tour = require('../models/Tour');

const router = express.Router();

// Setup session middleware
router.use(session({
  secret: 'your_session_secret', // Use a strong secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // Set 'secure: true' in production if you're using HTTPS
}));

// Hardcoded admin credentials
const adminCredentials = {
  username: 'admin',
  password: 'admin123'  // Hardcoded password
};

// Middleware to verify if the user is an admin
const verifyAdmin = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    return next();  // Allow access if user is admin
  } else {
    return res.status(403).json({ message: 'Access denied. You are not an admin.' });
  }
};

// Admin login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Check if the login credentials match the hardcoded admin credentials
  if (username === adminCredentials.username && password === adminCredentials.password) {
    // Set session data for admin
    req.session.user = { username, role: 'admin' };
    return res.status(200).json({ message: 'Login successful' });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Add tour (only accessible by admin)
router.post('/add-tour', verifyAdmin, async (req, res) => {
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

// Delete tour (only accessible by admin)
router.delete('/delete-tour', verifyAdmin, async (req, res) => {
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
