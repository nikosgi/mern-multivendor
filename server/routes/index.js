const fs = require('fs');
const path = require('path');

const authenticate = require('../middlewares/authentication')
const authorize = require('../middlewares/authorization')
const client = require('../../config/elasticsearch');

module.exports = (app) => {
  // API routes
  fs.readdirSync(__dirname + '/api/admin/').forEach((file) => {
    require(`./api/admin/${file.substr(0, file.indexOf('.'))}`)(app)(authenticate,authorize('admin'));
  });
  fs.readdirSync(__dirname + '/api/buyer/').forEach((file) => {
    require(`./api/buyer/${file.substr(0, file.indexOf('.'))}`)(app)(authenticate,authorize('buyer'));
  });
  fs.readdirSync(__dirname + '/api/public/').forEach((file) => {
    require(`./api/public/${file.substr(0, file.indexOf('.'))}`)(app)(client);
  });
  fs.readdirSync(__dirname + '/api/supplier/').forEach((file) => {
    require(`./api/supplier/${file.substr(0, file.indexOf('.'))}`)(app)(authenticate,authorize('seller'))(client);
  });
};
