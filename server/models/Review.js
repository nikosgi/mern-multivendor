const mongoose = require('mongoose');

const Profile = require('./account/Profile');

const ReviewSchema = new mongoose.Schema({
  stars: Number,
	title: String,
  description: String,
  date: Date,
});






module.exports = mongoose.model('Review', ReviewSchema);
