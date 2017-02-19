// src/server.js


// Setup Project Paths so we can just require('your-module')
// Search /server, /node_modules, and /lib
var path = require('path');
var _ = require('lodash');


//React stuff

//REACT MODULES
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from '../src/routes';
import NotFoundPage from '../src/components/NotFoundPage';

//require('app-module-path').addPath(__dirname);
//require('app-module-path').addPath(path.join(__dirname, "../lib"));

var cors          = require('cors');
var express       = require('express');
var bodyParser    = require('body-parser');
var mongoose      = require('mongoose');
var jwt           = require('express-jwt');
var passport      = require('passport');
var morgan        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var session       = require('express-session');
const MongoStore  = require('connect-mongo')(session);
var flash         = require('connect-flash');

var app = express();
const server = new Server(app);
const util = require('util')

// Config
app.config = require('./config/config');
require('./config/passport')(passport);
var PORT = app.config.port;

// API Resources


// Setup Webserver
app.use(cors());

// Services`
app.services = {}; // nothing for now

// set up our express application
app.use(morgan(app.config.env)); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

// get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', __dirname + "/../src/views");

// Mongoose
console.log('MongoURL:', app.config.mongo.uri);
//app.db = mongoose.connect(app.config.mongo.uri, app.config.mongo.options);
app.db = mongoose.connect(app.config.mongo.uri, app.config.mongo.options);

app.use(session({
   secret: 'mysecretkeyissecret',
   store: new MongoStore({ mongooseConnection: mongoose.connection }),
   resave: true,
   saveUninitialized: true
 })); // session secret

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Serve up any static files
console.log('Serving static files from: %s', path.join(__dirname, "/../src/static"));
app.use(express.static(path.join(__dirname, "/../src/static")));

//api resources
app.api = require('./api')(app, passport);

// Start the server...
if (require.main === module) {

    app.listen(PORT, function() {
        console.log("listening on %d", PORT);
    });
}
