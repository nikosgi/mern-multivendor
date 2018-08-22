var passport = require('passport');
var settings = require('../../../config/auth/settings');
require('../../../config/auth/passport')(passport);

var jwt = require('jsonwebtoken');
var User = require("../../models/user");


module.exports = (app) =>{

   app.post('/api/register', function(req, res) {
   		console.log("Pass username and pass");
  		if (!req.body.username || !req.body.password) {

		    res.json({success: false, msg: 'Please pass username and password.'});
	  	} else {
		    var user = new User({
      			email: req.body.username,
	      		password: req.body.password
    		});
    		console.log(user);
    	// save the user
	    	user.save(function(err) {
      			if (err) {
		        	return res.json({success: false, msg: 'Username already exists.'});
      			}
      			console.log("success");
      			res.json({success: true, msg: 'Successful created new user.'});
    		});
  		}
	});
  	app.post('/api/login', function(req, res) {
  		User.findOne({
    		email: req.body.username
  			}, function(err, user) {
    			if (err) throw err;

			    if (!user) {
      				res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    			} else {
	      			// check if password matches
      				user.comparePassword(req.body.password, function (err, isMatch) {
        				if (isMatch && !err) {
          					// if user is found and password is right create a token
          					var token = jwt.sign(user.toJSON(), settings.secret);
          					// return the information including token as JSON
	          				res.json({success: true, token: 'JWT ' + token});
        				} else {
	          				res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        				}
      				});
    			}
  		});
	});
}

