
// Setup Project Paths so we can just require('your-module')
// Search /server, /node_modules, and /lib
var path = require('path');
var _ = require('lodash');
//require('app-module-path').addPath(__dirname);
//require('app-module-path').addPath(path.join(__dirname, "../lib"));

var cors = require('cors');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('express-jwt');
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');
var app = express();



// Config
app.config = require('./config/config');
var PORT = app.config.port;

// Setup Webserver
app.use(cors());

// Services`
app.services = {}; // nothing for now

// Mongoose
console.log('MongoURL:', app.config.mongo.uri);
app.db = mongoose.connect(app.config.mongo.uri, app.config.mongo.options);

// Serve up any static files
console.log('Serving static files from: %s', path.join(__dirname, "/../build"));
app.use(express.static(path.join(__dirname, "/../build")));

// API Resources
app.api = require('./api')(app);

//auth0 setup

// Configure Passport to use Auth0
var strategy = new Auth0Strategy({
    domain:       process.env.AUTH0_DOMAIN,
    clientID:     process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:  process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
  }, function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  });

passport.use(strategy);

// This can be used to keep a smaller payload
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Start the server...
if (require.main === module) {

    app.listen(PORT, function() {
        console.log("listening on %d", PORT);
    });
}
