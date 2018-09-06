const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const historyApiFallback = require('connect-history-api-fallback');
const mongoose = require('mongoose');
const elasticsearch = require('elasticsearch');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const cookieParser =  require('cookie-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const client = require('../config/elasticsearch');
const config = require('../config/config');
const webpackConfig = require('../webpack.config');

const isDev = process.env.NODE_ENV !== 'production';
const port  = process.env.PORT || 8080;


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
const db = mongoose.connection;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session(
  {
    secret: '4nsecret!%%',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      // secure: true,
      maxAge: 10 * 60 * 1000 // 10 minutes
    },
    store: new MongoStore({ mongooseConnection: db })
  }
));
app.use(expressValidator());



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

// API routes
require('./routes')(app);

app.listen(port, 'localhost', (err) => {
  if (err) {
    console.log(err);
  }
  console.info('Open http://localhost:%s/.', port);
});

module.exports = app;
