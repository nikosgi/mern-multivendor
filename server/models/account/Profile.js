const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const ProfileSchema = new mongoose.Schema({

  isSeller: Boolean,

  balance: mongoose.Schema.Types.Decimal128,

  personalAccount: {
    phoneNumber: String,
    country: String,
    city: String,
    town: String,
  },

  bankAccount: {
    name: String,
    holder: String,
    address: String,
  },

  messages: [{
    type: mongoose.Schema.Types.ObjectID,
  }],

  sales: [{
    type: mongoose.Schema.Types.OblectId,
  }],
  orders: [{
    type: mongoose.Schema.Types.ObjectID,
  }],
  store: mongoose.Schema.Types.ObjectID,


});




module.exports = mongoose.model('Profile', ProfileSchema);
