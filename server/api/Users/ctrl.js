var User            = require('./model');
var path = require('path');

module.exports = function(app, passport) {
    var request = require('request');

    app.get('/api/users', function(req, res) {
        User.find(function(err, users) {
            users.map(function (user){
              user.local.password = undefined;
            });
            if (err) {
                return console.log(err);
            }
            res.json(users);
        });
    });


    app.get('/api/profilepicture', function(req, res) {
      console.log("profilepicture")
      res.sendFile(path.join(__dirname, '../../public/img/profiles', 'default_picture.png'));
    });

    app.get('/api/users/:id', function(req, res) {
        console.log("testing id call for user");
    });


    // process the login form
    app.post('/api/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    //process the signup form
    app.post('/api/signup', passport.authenticate('local-signup', {
        successRedirect : '/home', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/api/profile', isLoggedIn, function(req, res) {
        delete req.user.local.password;
        console.log(req.user.local.password);
        res.json(req.user)
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/api/logout', function(req, res) {
      console.log(req)
      req.session.destroy();
      //req.logout();
    });

};
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
