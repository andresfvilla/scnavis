var User            = require('./model');

module.exports = function(app, passport) {
    var request = require('request');

    app.get('/api/users', function(req, res) {
        User.find(function(err, users) {
            users.map(function (user){
              user.local.password = undefined
            });
            if (err) {
                return console.log(err);
            }
            res.json(users);
        });
    });

    app.get('/api/users/:id', function(req, res) {
        console.log("testing id call for user");
    });

    //     // =====================================
    //     // HOME PAGE (with login links) ========
    //     // =====================================
    //     app.get('/', function(req, res) {
    //         res.render('index.ejs'); // load the index.ejs file
    //     });
    //
    //     // =====================================
    //     // LOGIN ===============================
    //     // =====================================
    //     // show the login form
    //     app.get('/login', function(req, res) {
    //         console.log("test")
    //         // render the page and pass in any flash data if it exists
    //         res.render('login.ejs', { message: req.flash('loginMessage') });
    //     });
    //
    //     // process the login form
    //     app.post('/login', passport.authenticate('local-login', {
    //         successRedirect : '/profile', // redirect to the secure profile section
    //         failureRedirect : '/login', // redirect back to the signup page if there is an error
    //         failureFlash : true // allow flash messages
    //     }));

    //process the signup form
    app.post('/api/signup', passport.authenticate('local-signup', {
        successRedirect : '/home', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    //
    //     // =====================================
    //     // PROFILE SECTION =====================
    //     // =====================================
    //     // we will want this protected so you have to be logged in to visit
    //     // we will use route middleware to verify this (the isLoggedIn function)
    //     app.get('/profile', isLoggedIn, function(req, res) {
    //         delete req.user.local.password;
    //         res.render('profile.ejs', {
    //             user : req.user // get the user out of session and pass to template
    //         });
    //     });
    //
    //     // =====================================
    //     // LOGOUT ==============================
    //     // =====================================
    //     app.get('/logout', function(req, res) {
    //         req.logout();
    //         res.redirect('/');
    //     });
    //
    //     // Send everything else to react
    //     app.get('*', function(req, res) {
    //         //res.status(200).sendFile(app.config.index);
    //     });
    // };
    //
    // // route middleware to make sure a user is logged in
    // function isLoggedIn(req, res, next) {
    //
    //     // if user is authenticated in the session, carry on
    //     if (req.isAuthenticated())
    //         return next();
    //
    //     // if they aren't redirect them to the home page
    //     res.redirect('/');

};
