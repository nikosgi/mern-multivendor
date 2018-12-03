const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const ProfileSchema = new mongoose.Schema({

  username: String,

  balance: mongoose.Schema.Types.Decimal128,

  personalAccount: {
    phoneNumber: String,
    country: String,
    city: String,
    town: String,
  },

  bankAccount: [{
    name: String,
    holder: String,
    address: String,
  }],

  reviews: [{
    // type: mongoose.Schema.Types.OblectID,
  }],
  // products: [{
  //   type: mongoose.Schema.Types.OblectId,
  //   ref: 'Product',
  // }],
  messages: [{
    // type: mongoose.Schema.Types.ObjectID,
  }],
  sales: [{
    // type: mongoose.Schema.Types.OblectID,
  }],
  orders: [{
    // type: mongoose.Schema.Types.ObjectID,
  }],

  store: {
    name: String,
    opened: Date,
    description: String,
  },


});




module.exports = mongoose.model('Profile', ProfileSchema);
