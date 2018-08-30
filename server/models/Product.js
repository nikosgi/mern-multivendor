const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
	title: String,
  price: Number,
});






module.exports = mongoose.model('Product', ProductSchema);
