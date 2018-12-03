// middleware for authentication
var User = require("../models/account/User");

module.exports = function authorize(role) {

  return function(req,res,next){
    if (!res.locals.user){
      if (role === 'anonymous')
        next();
      else
        res.status(403).send({message: "Forbidden"});
    } else {
      const {roles} = res.locals.user;
      if (roles.indexOf(role) > -1 )
        next();
      else
        res.status(403).send({message: "Forbidden"});
    }
  }
}
