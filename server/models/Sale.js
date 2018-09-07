const mongoose = require('mongoose');

const Profile = require('./account/Profile');
const Listing = require('./Listing');

const SalesSchema = new mongoose.Schema({


  buyer: Profile,
  listing: Listing,
  status: String,
  date : Date,
  price: Number,
});






module.exports = mongoose.model('Sale', SalesSchema);
