const mongoose = require('mongoose');

const TourSchema = new mongoose.Schema({

  title: {type: String,required: true},
  price: {type: Number,required: true},
  description: {type: String,required: true},
  image: {type: String,required: true},
  location: {type: String,required: true},
  createdAt: {type: Date,default: Date.now},
});


const Tour = mongoose.model('Tour', TourSchema);
module.exports = Tour;
