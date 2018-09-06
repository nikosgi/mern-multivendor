const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new mongoose.Schema({
	email: String,
	password: String,
	verified: Boolean,
	roles: [{type: String}],
	profile: mongoose.Schema.Types.ObjectID, 
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

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, res) {
        if (err) {
            return cb(err);
        }
        cb(null, res);
    });
};

UserSchema.methods.validPassword = function (pass){
		bcrypt.compare(pass, this.password, function(err, res){
			if (err)
				return err
			else
				return res
		})
}


module.exports = mongoose.model('User', UserSchema);
