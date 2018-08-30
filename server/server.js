const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const historyApiFallback = require('connect-history-api-fallback');
const mongoose = require('mongoose');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const cookieParser =  require('cookie-parser');
const expressValidator = require('express-validator');
const session = require('express-session');

const config = require('../config/config');
const webpackConfig = require('../webpack.config');

const isDev = process.env.NODE_ENV !== 'production';
const port  = process.env.PORT || 8080;

const authenticate= require("./middlewares/authentication");

//-------------- Database Mongoose ------------------
mongoose.connection.on('error', function(err){
  console.log('Mongoose default connection error: '+ err);
});
mongoose.connection.on('connected', function(){
  console.log('Mongoose default connection open to ');
});

console.log(config);

mongoose.connect(config.db, {
  useMongoClient: true,
});
mongoose.Promise = global.Promise;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret: '4nsecret!%%', resave: false, saveUninitialized: true,}));
app.use(expressValidator());
app.use('/api/supplier/',authenticate)
// API routes
require('./routes')(app);

if (isDev) {
  console.log("isDev");
  const compiler = webpack(webpackConfig);

  app.use(historyApiFallback({
    verbose: false
  }));

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: path.resolve(__dirname, '../client/public'),
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));

  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(path.resolve(__dirname, '../dist')));
} else {
  app.use(express.static(path.resolve(__dirname, '../dist')));

  app.get('*', function (req, res) {
    console.log(req.session);
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
    res.end();
  });
}

app.listen(port, 'localhost', (err) => {
  if (err) {
    console.log(err);
  }
  console.info('Open http://localhost:%s/.', port);
});

module.exports = app;
