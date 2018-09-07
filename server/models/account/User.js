const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

var CounterSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});

var counter = mongoose.model('Counter', CounterSchema);

const UserSchema = new mongoose.Schema({
	email: String,
	username: {
		type: String,
		default: 1642653,
	},
	password: String,
	verified: Boolean,
	roles: [{type: String}],
	profile: mongoose.Schema.Types.ObjectId,
});

UserSchema.pre('save',function(next){
	var user = this;
	console.log("user -> : "+user);

	user.findByIdAndUpdateAsync({_id: 'entityId'}, {$inc: { seq: 1} }, {new: true, upsert: true}).then(function(count) {
        console.log("...count: "+JSON.stringify(count));
        doc.sort = count.seq;
        next();
    })
    .catch(function(error) {
        console.error("counter error-> : "+error);
        throw error;
    });
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
