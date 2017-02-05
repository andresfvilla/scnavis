var PORT = process.env.PORT;

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
var app = express();


// Config
app.config = require('./config/config');

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
app.api = require('api')(app);

// Seed
if (app.config.seed) {
    var seed = require('config/seed');
    seed(app);
}

// Start the server...
if (require.main === module) {

    if (process.env.NODE_ENV === "production") {

        var payload_to_slack = {
            text: '_STARTED_ <http://crackcookie.xyz/|http://crackcookie.xyz/>',
            icon_url: "http://i.imgur.com/Qdm0wfY.png",
            username: "mediator"
        };
        app.slack.send(payload_to_slack);
    }

    app.listen(PORT, function() {
        console.log("listening on %d", PORT);
    });
}
