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


    app.get('/api/profilepicture/:image', function(req, res) {
      console.log(req.params.image)
      res.sendFile(path.join(__dirname, '../../public/img/profiles', req.params.image));
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
    app.get('/api/profile', function(req, res) {
        if(req.isAuthenticated()){
          console.log("is authenticated")
          delete req.user.local.password;
          res.json(req.user)
        } else {
          console.log("not authenticated")
          res.status(401);
          return next(err);
        }
    });

    app.put('/api/profile/:id', function(req, res) {
      if(req.isAuthenticated()){
        console.log(req.body)
      } else {
        res.status(401);
        return next(err);
      }
      User.findOne({
            _id: req.body.id
        }, function(err, user) {
            console.log('this is the user')
            console.log(user)
            for (var key in req.body) {
              if(key != 'id'){
                console.log()
                user.local[key] = req.body[key];
              }
            }
            user.save();
            res.json(user);
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/api/logout', function(req, res) {
      console.log(req)
      req.logout();
      res.json({"status": "success"})
    });

    app.get('/api/isLoggedIn', function(req, res) {
      console.log(req)
      req.logout();
      res.json({"status": "success"})
    });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    return false;
}
