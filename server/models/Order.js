const mongoose = require('mongoose');

const Profile = require('./account/Profile');
const Product = require('./Product');

const OrderSchema = new mongoose.Schema({

  seller : Profile,
  product: Product,
  status : String,
  date : Date,
  price: Number,

});






module.exports = mongoose.model('Order', OrderSchema);
