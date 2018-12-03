const User = require('../../../models/account/User');

var uniqid = require('uniqid');

module.exports = (app) => (client) => {
  /*
   * Sign up
   */
  app.post('/api/account/signup', (req, res, next) => {
    const { body } = req;
    const { password } = body;
    let { email } = body;


    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Enter a valid email').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();

    const errors = req.validationErrors();

    if (errors){
      req.session.errors=errors;
      return res.send({ success: false, message: errors[0].msg});
    };

    email = email.toLowerCase();
    email = email.trim();
    // Steps:
    // 1. Verify email doesn't exist
    // 2. Save
    console.log(email);
    User.find({ email: email}, (err, previousUsers) => {

      if (err)
        return res.send({ success: false, message: 'Error: Server error' + err});
      else if (previousUsers.length > 0)
        return res.send({ success: false, message: 'Error: Account already exist.'});

      // Save the new user
      const user = new User();


      user.username = uniqid();
      user.email = email;
      user.password = password;
      user.verified = false;
      user.roles =  ["user","anonymous"];

      user.save((err, user) => {
        if (err)
          return res.send({ success: false, message: 'Error: Server error' + err});
        req.session.success= true;
        return res.send({ success: true, message: 'Signed up'});
      });
    });

  });

  app.post('/api/account/signin', (req, res, next) => {
    const { body } = req;
    const { password } = body;
    let { email } = body;

    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Enter a valid email').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();

    const errors = req.validationErrors();

    if (errors){
      req.session.errors=errors;
      return res.send({ success: false, message: errors[0].msg});
    };

    email = email.toLowerCase();
    email = email.trim();


    User.find({email: email}, (err, users) => {
      if (err)
        return res.send({success: false, message: 'Error:' + err});
      if (users.length != 1)
        return res.send({success: false, message: 'Error: Invalid'});

      const user = users[0];
      console.log(user, 'user @ signin');
      user.comparePassword(password, function (err, matched) {
          if (matched && !err) {
            req.session.userID = user._id;
            req.session.ip = req.connection.remoteAddress;
            // const userSession = new Session();
            // userSession._id = req.sessionID;
            // userSession.userId = user._id;
            // userSession.save((err, doc) => {
            //   if (err)
            //     return res.send({ success: false, message: 'Error: server error' + err});
              return res.send({ success: true, message: 'Valid sign i'});
            // });
          } else {
            res.status(401).send({success: false, message: 'Authentication failed. Wrong password.'});
          }
      });
    });
  });

  app.get('/api/account/verify', (req, res, next) => {
    // res.send({ success: true, message: 'Good'});
    // Get the token
    console.log(req.query);
    const {userID} = req.session;
    // Verify the token is one of a kind and it's not deleted.
    console.log(req.session);
    if (userID){
      User.find({_id: userID}, (err, users) => {
        if (err)
          return res.send({success: false, message: 'Error:' + err});
        if (users.length != 1)
          return res.send({success: false, message: 'Error: Invalid'});

        return res.send({success: true, message: 'Valid verify', user: users[0]});

      });
    }else{
        res.send({ success: false, message: 'Error: Invalid'});
    }
  });

  app.get('/api/account/logout', (req, res, next) => {
    // Get the token
    const {sid} = req.session
    // ?token=test

    // Verify the token is one of a kind and it's not deleted.

    Session.findOneAndUpdate({
      userId: sid,
      isDeleted: false
    }, {
      $set: {
        isDeleted:true
      }
    }, null, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }

      return res.send({
        success: true,
        message: 'Good'
      });
    });
  });




};
