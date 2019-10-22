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
var favicon       = require('serve-favicon');
var fs = require('fs');
var async = require('async');
var xml2js = require('xml2js');
var Grid = require('gridfs-stream');
var User = require('./api/Users/model')


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
var conn = mongoose.connection;

//GridFS
conn.once('open', function () {
   app.gfs = Grid(conn.db, mongoose.mongo);

   var options = {filename : 'default_profile.png'}; //can be done via _id as well
   app.gfs.exist(options, function (err, found) {
     if (err) return handleError(err);
     if (found) {
       console.log('File exists')
     } else {
       console.log('File does not exist, using default picture');
       var writestream = app.gfs.createWriteStream({
            filename: 'default_profile.png'
        });
        fs.createReadStream(app.config.imageDest + 'default_profile.png').pipe(writestream);
     }
   });
})


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
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(express.static(path.join(__dirname, "../public")));

//api resources
app.api = require('./api')(app, passport);

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

//This should be kept, this will make it so every request goes through this, and deletes the password field from it.
app.use(function(req, res, next){
  if (req.session & req.session.user){
    User.findOne({email: req.session.user.email}, function (err,user){
      if (user){
        req.user = user;
        delete req.user.password;
        req.session.user = req.user;
        req.locals.user = req.user;
      }
      next();
    });
  } else {
    next();
  }
});

server.listen(PORT, function() {
  console.log('Express server listening on port ' + PORT);
});
