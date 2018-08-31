// middleware for authentication
var User = require("../models/account/User");

module.exports = function authorize(role) {

  return function(req,res,next){
    console.log(res.locals);
    console.log("WTF");
    if (!res.locals.user){
      console.log("WTFx",role);
      if (role === 'Anonymous'){
        next();
      }else{
        res.status(403).send({message: "Forbidden"});
      }
    } else {
      const {roles} = res.locals.user;
      console.log("WTFz");
      if (roles.indexOf(role) > -1 )
        next();
      else
        res.status(403).send({message: "Forbidden"});

    }
  }
}
