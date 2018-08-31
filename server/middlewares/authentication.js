// middleware for authentication
var User = require("../models/account/User");

module.exports = async function authenticate(req, res, next) {
  const {userID} = req.session;
  console.log("AUth middleware");
  if (!userID)
    res.locals.user = null;
  else
    await User.find({_id: userID}, (err, users) => {
      if (err)
        return res.send({success: false, message: 'Error:' + err});
      if (users.length != 1)
        return res.send({success: false, message: 'Error: Invalid'});
      const user = users[0];
      res.locals.user = user;
      console.log('@AUTH/ ',res.locals);
    });
  next();
}
