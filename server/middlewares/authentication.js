// middleware for authentication
module.exports = function authenticate(req, res, next) {
  const {sid} = req.session;
  console.log("@AUTHNETICATIN",req.session,sid);
  if (!sid)
    res.locals.user = null;
  else
    Session.find({ userId: sid, isDeleted: false}, (err, sessions) => {
      if (err)
        res.locals.error = err;
      if (sessions.length != 1){
        res.locals.error = { success: false, message: 'Multiple active sessions found'};
      }else{
        User.find({_id: sid}, (err, users) => {
          if (err)
            return res.send({success: false, message: 'Error:' + err});
          if (users.length != 1)
            return res.send({success: false, message: 'Error: Invalid'});
          const user = users[0];
          res.locals.user = user;
          console.log('@AUTH/ ',res.locals);
        });
      }
    });
  next();

}
