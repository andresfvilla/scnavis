module.exports = function(app) {
    var request = require('request');

    // routes/user.js
    var express = require('express');
    var passport = require('passport');
    var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
    var router = express.Router();

    // Get the user profile
    app.get('/', ensureLoggedIn, function(req, res, next) {
      res.render('user', { user: req.user });
    });


    app.get('/api/users', function(req, res) {
        app.api.users.model.find(function(err, users) {
            if (err) {
                return console.log(err);
            }
            res.json(users);
        });
    });

    app.post('/api/users/', function(req, res) {
        app.api.users.model.findOne({
            uuid: req.params.uuid
        }, function(err, passenger) {
            console.log('putting: ', passenger)
            if (err) {
                res.send('There was an error processing the passenger uuid');
            } else {
                console.log(req.body)
                passenger.passengerName = req.body.passengerName;
                res.json(passenger);
            }
        });
        res.render('login', { env: process.env });
    });

    app.put('/api/corppassengers/:uuid', function(req, res) {
        app.api.corppassengers.model.findOne({
            uuid: req.params.uuid
        }, function(err, passenger) {
            console.log('putting: ', passenger)
            if (err) {
                res.send('There was an error processing the passenger uuid');
            } else {
                console.log(req.body)
                passenger.passengerName = req.body.passengerName;
                res.json(passenger);
            }
        });
    });

};
