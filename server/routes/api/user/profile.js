const Product = require('../../../models/Product');
// const Session = require('../../models/account/Session');

const Store

module.exports = (app) => (auth) => (client) => {

  app.get('/api/store/:userId', auth, (req, res, next) => {

    console.log(req.params);

    res.send({userid: req.params.userId});

  });





};
