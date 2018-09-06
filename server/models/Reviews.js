const mongoose = require('mongoose');

const Profile = require('./account/Profile');

const ProductSchema = new mongoose.Schema({
	title: String,
  price: Number,
  description: String,
  type: String, // Auction or Buy now
  bids: [{
      value: Profile,
      user: mongoose.Schema.Types.ObjectID,
  }]
});






module.exports = mongoose.model('Product', ProductSchema);
