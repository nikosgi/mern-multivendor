const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const StoreSchema = new mongoose.Schema({
  balance: {

  },
  orders: {

  },
  reviews: {

  },
  comments: {

  },
  products: {

  },
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
	},
	verified: {
		type: Boolean,
		required: true,
	}
});

UserSchema.pre('save',function(next){
	var user = this;
	console.log("user -> : "+user);
	if (this.isModified('password') || this.isNew ){
		bcrypt.genSalt(10, function (err,salt) {
			console.log(err + salt);
			if (err){
				console.log(err);
				return next(err);
			}
			bcrypt.hash(user.password, salt, null, function (err, hash) {
				if (err){
					console.log(err);
					return next(err);
				}
				user.password = hash;
				next();
			});
		});
	} else{
		console.log("i return next");
		return next();
	}
});




module.exports = mongoose.model('User', StoreSchema);
