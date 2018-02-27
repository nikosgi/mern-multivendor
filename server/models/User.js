const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
	}
});

UserSchema.pre('save',function(next){
	var user = this;
	console.log("i am at presave user");
	if (this.isModified('password') || this.isNew ){
		console.log("i am at presave user");
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

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
