const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

var CounterSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});

var counter = mongoose.model('Counter', CounterSchema);

const UserSchema = new mongoose.Schema({
	email: String,
	username: String,
	password: String,
	verified: Boolean,
	roles: [{type: String}],
	type: mongoose.Schema.Types.ObjectId, //Business or Personal
});

UserSchema.pre('save',function(next){
	var user = this;
	if (this.isModified('password') || this.isNew ){
		bcrypt.genSalt(10, function (err,salt) {
			if (err)
				return next(err);
			bcrypt.hash(user.password, salt, null, function (err, hash) {
				if (err)
					return next(err);
				user.password = hash;
				next();
			});
		});
	} else{
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
