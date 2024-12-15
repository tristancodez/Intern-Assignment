const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const connectDB = require('./config/db');
const tourRoutes = require('./routes/tourRoutes');
const bookingRoutes = require('./routes/bookingRoutes')
const bodyParser = require('body-parser');


dotenv.config();

connectDB();

const app = express();


app.use(express.json());
app.use(bodyParser.json());
app.use(cors());


app.use('/api/tours', tourRoutes);
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.yellow.bold);
});
