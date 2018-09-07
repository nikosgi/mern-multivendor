const mongoose = require('mongoose');

const Profile = require('./account/Profile');


const MessageSchema = new mongoose.Schema({
	sender: Profile,

  date : Date,
  subject: String,
  body: String,
  
});






module.exports = mongoose.model('Message', MessageSchema);
