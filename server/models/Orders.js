const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({

  buyer: mongoose.Schema.Types.ObjectID,
  product: mongoose.Schema.Types.ObjectID,
  status: String,
  date : Date,
  price: Number,
  
});






module.exports = mongoose.model('Product', ProductSchema);
