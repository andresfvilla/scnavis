// Babel ES6/JSX Compiler
require('babel-register');

// Setup Project Paths so we can just require('your-module')
// Search /server, /node_modules, and /lib
var path = require('path');
var _ = require('lodash');


var cors          = require('cors');
var express       = require('express');
var mongoose      = require('mongoose');
var jwt           = require('express-jwt');
var passport      = require('passport');
var morgan        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var session       = require('express-session');
const MongoStore  = require('connect-mongo')(session);
var flash         = require('connect-flash');
var request       = require('request');
var async = require('async');
var xml2js = require('xml2js');

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

// get information from html forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Mongoose
console.log('MongoURL:', app.config.mongo.uri);
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
console.log('Serving static files from: %s', path.join(__dirname, "../public"));
app.use(express.static(path.join(__dirname, "../public")));

//api resources
app.api = require('./api')(app, passport);


// app.use(function(req, res) {
//     console.log("testing")
//     Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
//       if (err) {
//         res.status(500).send(err.message)
//       } else if (redirectLocation) {
//         res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
//       } else if (renderProps) {
//         var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
//         var page = swig.renderFile('./views/index.html', { html: html });
//         res.status(200).send(page);
//       } else {
//         res.status(404).send('Page Not Found')
//       }
//     });
// });

/**
 * Socket.io stuff.
 */
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var onlineUsers = 0;

io.sockets.on('connection', function(socket) {
  onlineUsers++;

  io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });

  socket.on('disconnect', function() {
    onlineUsers--;
    io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
  });
});

server.listen(PORT, function() {
  console.log('Express server listening on port ' + PORT);
});
