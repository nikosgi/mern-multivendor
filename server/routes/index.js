const fs = require('fs');
const path = require('path');

module.exports = (app) => {
  // API routes
  fs.readdirSync(__dirname + '/api/').forEach((file) => {
    console.log('tatata'+`./api/${file.substr(0, file.indexOf('.'))}`);
    require(`./api/${file.substr(0, file.indexOf('.'))}`)(app);
  });
};
