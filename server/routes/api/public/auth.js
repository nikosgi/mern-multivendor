var passport = require('passport');
var CryptoJS = require('crypto-js');
var settings = require('../../../../config/auth/settings');
require('../../../../config/auth/passport')(passport);

// var jwt = require('jsonwebtoken');
var User = require("../../../models/account/User");


module.exports = (app) => (client) =>{

   app.post('/api/register', function(req, res) {
     console.log('headers: =>: ',req.headers);
     const token = req.headers['x-token'];

     req.checkBody('email', 'Email is required').notEmpty();
     req.checkBody('email', 'Enter a valid email').isEmail();
     req.checkBody('password', 'Password is required').notEmpty();
     //TODO check for errors


		 var user = new User({
       email: req.body.username,
	     password: req.body.password,
       verified: false,
     });
     user.save(function(err) {
       if (err)
         return res.json({success: false, msg: 'Username already exists.'});
       res.json({success: true, msg: 'Successful created new user.'});
     });

	});
  	app.post('/api/login', function(req, res) {
      const { email, password} = req.body
      User.findOne({email: email}, function(err, user) {
        if (err) throw err;
        if (!user) {
          res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    		} else {
          user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {
              // res.cookie

              var token = jwt.sign(user.toJSON(), settings.secret);
              var token_split = token.split('.');

              var cookie_h_p = token_split[0] + '.' + token_split[1];
              var cookie_s = token_split[2];

              res.cookie('good_cookie', cookie_h_p.toString(), {secure: true});
              res.cookie('bad_cookie', cookie_s.toString(), {secure: true, httpOnly: true});
          		// return the information including token as JSON
	          	// res.json({success: true, token: 'JWT ' + encrypted});
              res.send('');
            	} else {
	          		res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        				}
      				});
    			}
  		});
	});
}
