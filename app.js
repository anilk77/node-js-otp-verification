var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
global.__basedir = __dirname;
var configs = require('./app/utility/config');
var users = require('./app/routes/apiUserRoutes');
var admin = require('./app/routes/apiAdminRoutes');
require("./app/icoslisteners/cronjob");


require('checkenv').check();
console.log(configs.envPath)
require('dotenv').config({
  path: configs.envPath
})

var app = express();
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://developer:ycCFm2aLmG3i3sEj@oak-prod.63ztw.mongodb.net/oak-prod', {
  useNewUrlParser: true,
  useCreateIndex: true
});
mongoose.set("debug", (collectionName, method, query, doc) => {
  console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
});
var db = mongoose.connection;
db.on('error', (err) => {
  console.log('Error connecting to mongoDB: ', err);
});
db.on('open', () => {
  console.log('Connection established to mongoDB.');
});

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
var whitelist = process.env.AllowOriginDomain;
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist?.indexOf(origin) !== -1 || whitelist == "*") {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));
app.use('/static', express.static('public'))
app.use('/favicon.ico', express.static('publics/favicon.ico'));

app.get('/', function (req, res) {
  res.status(200).json({
    code: 200,
    message: 'Welcome to the ' + configs.siteName + ' api'
  });
});
app.use('/', function (req, res, next) {
  next();
});
app.use('/user/', users);

// 404
app.use(function (req, res) {
  return res.status(404).send({ code: 404, message: 'Route ' + req.url + ' Not found.' });
});

// 500 - Any server error
app.use(function (err, req, res) {
  return res.status(500).send({ code: 500, message: 'Route' + req.url + ' Not found.' });
});
const port = process.env.PORT || '3000';
app.listen(port);
/* eslint-disable no-console */
console.log('Magic happens on port ' + port);
/* eslint-enable no-console */

module.exports = app;
