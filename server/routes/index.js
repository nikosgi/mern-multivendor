const fs = require('fs');
const path = require('path');

const authenticate = require('../middlewares/authentication')
const authorize = require('../middlewares/authorization')

module.exports = (app) => {
  // API routes
  fs.readdirSync(__dirname + '/api/admin/').forEach((file) => {
    require(`./api/admin/${file.substr(0, file.indexOf('.'))}`)(app)(authorize('admin'));
  });
  fs.readdirSync(__dirname + '/api/buyer/').forEach((file) => {
    require(`./api/buyer/${file.substr(0, file.indexOf('.'))}`)(app);
  });
  fs.readdirSync(__dirname + '/api/public/').forEach((file) => {
    require(`./api/public/${file.substr(0, file.indexOf('.'))}`)(app);
  });
  fs.readdirSync(__dirname + '/api/supplier/').forEach((file) => {
    require(`./api/supplier/${file.substr(0, file.indexOf('.'))}`)(app)(authorize('seller'));
  });
};
