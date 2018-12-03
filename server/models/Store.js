const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const StoreSchema = new mongoose.Schema({


  name: String,
  opened: Date,
  
  ownedBy: mongoose.Schema.Types.ObjectId,

  description: String,

  reviews: [{
    type: mongoose.Schema.Types.OblectId,
  }],
  products: [{
    type: mongoose.Schema.Types.OblectId,
    ref: 'Product',
  }]
});


module.exports = mongoose.model('Store', StoreSchema);
