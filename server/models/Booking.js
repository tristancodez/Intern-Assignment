const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({

  name: {type: String,required: true},
  age : {type: Number,required:true},
  email: {type: String,required: true},
  contact: {type:String,required:true},
  travelers : {type:Number,required:true},
  special_req : {type:String},
  start_date : {type:Date,required:true},
  end_date : {type:Date,required:true},
  tour_title : {type:String,required : true},
  tour_location : {type:String,required : true}


});


const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;
