var passport = require('passport');
var CryptoJS = require('crypto-js');
var settings = require('../../../../config/auth/settings');
require('../../../../config/auth/passport')(passport);

// var jwt = require('jsonwebtoken');
var User = require("../../../models/account/User");


module.exports = (app) => (client) =>{

   app.post('/api/products', function(req, res) {
     const { title} = req.body;
     client.search({
       index: 'products',
       type: 'product',
       body: {
         query: {
           match: {
             "productTitle": title
           }
         }
       }
     }).then(function(resp) {
       console.log(resp);
       res.json(resp);
     }, function(err) {
       res.json(err.message);
       console.trace(err.message);
     });

	});
}
