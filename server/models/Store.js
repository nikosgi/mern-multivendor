const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const StoreSchema = new mongoose.Schema({
  name: String,
  opened: Date,


  reviews: [{
    type: mongoose.Schema.Types.OblectId,
  }],
  products: [{
    type: mongoose.Schema.Types.OblectId,
    ref: 'Product',
  }]
});


module.exports = mongoose.model('User', StoreSchema);
