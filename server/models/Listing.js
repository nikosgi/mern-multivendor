const mongoose = require('mongoose');


const Profile = require('./account/Profile');
const Product = require('./Product');

const ListingSchema = new mongoose.Schema({
  type: String,
  created: Date,
  started: Date,
  ended: Date,

  product: Product,
  quantity: Number,
  shipping: String,

  bids: [{
      value: Profile,
      user: mongoose.Schema.Types.ObjectID,
  }],


});







module.exports = mongoose.model('Product', ListingSchema);
