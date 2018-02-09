var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport');

var connectionString = 'mongodb://127.0.0.1:27017/cs5610summer1';

var mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL);

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET }));

app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));
// var assignment = require('./assignment/app.js');
var project = require('./project/app.js');

// assignment(app);
project(app);

require("./experiments/todos.js")(app);


var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 5000;

app.listen(port, ipaddress);