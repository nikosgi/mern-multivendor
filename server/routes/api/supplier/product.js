const Product = require('../../../models/Product');
// const Session = require('../../models/account/Session');


module.exports = (app) => (auth) => (client) => {

  app.get('/api/supplier/products', auth, (req, res, next) => {
    // Get the token
    const {sid} = req.session
    // Verify the token is one of a kind and it's not deleted.

    Session.find({
      userId: sid,
      isDeleted: false
    }, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      console.log('these are the sessions baby: ', sessions)
      if (sessions.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      } else {
        return res.send({
          success: true,
          message: 'Good'
        });
      }
    });
  });

  app.post('/api/supplier/products', auth, (req, res, next) => {
    const { title, price, description } = req.body;

    req.checkBody('title', 'Title is required').notEmpty();
    req.checkBody('price', 'Price is required').notEmpty();
    req.checkBody('description', 'Decsription is required').notEmpty();
    const errors = req.validationErrors();

    if (errors){
      req.session.errors=errors;
      return res.send({ success: false, message: errors[0].msg});
    };

    const product = new Product();
    product.title = title;
    product.price = price;

    product.save((err, product) => {
      if (err)
        return res.send({ success: false, message: 'Error: Server error'});
      req.session.success= true;
      return res.send({ success: true, message: 'Product saved'});
    });

    client.index({
      index: 'products',
      type: 'product',
      body: {
        "productTitle": product.title,
        "productDescription": product.description,
      }
    }, function(err, resp, status) {
      console.log(resp);
    });

  });

  app.delete('/api/supplier/products', auth,  (req, res, next) => {
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


    User.find({email: email},{runValidators: true}, (err, users) => {
      if (err)
        return res.send({success: false, message: 'Error:' + err});
      if (users.length != 1)
        return res.send({success: false, message: 'Error: Invalid'});

      const user = users[0];

      user.comparePassword(password, function (err, matched) {
          if (matched && !err) {
            req.session.sid = user._id;
            const userSession = new Session();
            userSession.userId = user._id;
            userSession.save((err, doc) => {
              if (err)
                return res.send({ success: false, message: 'Error: server error'});
              return res.send({ success: true, message: 'Valid sign in', token: doc._id });
            });
          } else {
            res.status(401).send({success: false, message: 'Authentication failed. Wrong password.'});
          }
      });
    });
  });


  app.put('/api/supplier/products',auth, (req, res, next) => {
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
