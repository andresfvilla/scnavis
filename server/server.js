
// Setup Project Paths so we can just require('your-module')
// Search /server, /node_modules, and /lib
var path = require('path');
var _ = require('lodash');
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
var flash         = require('connect-flash');

var app = express();
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
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs');
app.set('views', __dirname + "/views");

// required for passport
app.use(session({ secret: 'mysecretkeyissecret' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Mongoose
console.log('MongoURL:', app.config.mongo.uri);
app.db = mongoose.connect(app.config.mongo.uri, app.config.mongo.options);

// Serve up any static files
console.log('Serving static files from: %s', path.join(__dirname, "/../build"));
app.use(express.static(path.join(__dirname, "/../build")));

//api resources
app.api = require('./api')(app, passport);

// Start the server...
if (require.main === module) {

    app.listen(PORT, function() {
        console.log("listening on %d", PORT);
    });
}
