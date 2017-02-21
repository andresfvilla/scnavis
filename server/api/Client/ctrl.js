var swig          = require('swig');
var React         = require('react');
var Router        = require('react-router');
var ReactDOM      = require('react-dom/server');
var routes        = require('../../../client/routes');

module.exports = function(app, passport) {

  app.use(function(req, res) {
    Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
      if (err) {
        res.status(500).send(err.message)
      } else if (redirectLocation) {
        res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
          console.log(renderProps)
          var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
          var page = swig.renderFile('views/index.html', { html: html });
          res.status(200).send(page);
      } else {
        res.status(404).send('Page Not Found')
      }
    });
  });

  app.use(function(err, req, res, next) {
    console.log(err.stack.red);
    res.status(err.status || 500);
    res.send({ message: err.message });
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
//
//     // =====================================
//     // SIGNUP ==============================
//     // =====================================
//     // show the signup form
//     app.get('/signup', function(req, res) {
//         // render the page and pass in any flash data if it exists
//         res.render('signup.ejs', { message: req.flash('signupMessage') });
//     });
//
//     //process the signup form
//     app.post('/signup', passport.authenticate('local-signup', {
//         successRedirect : '/profile', // redirect to the secure profile section
//         failureRedirect : '/signup', // redirect back to the signup page if there is an error
//         failureFlash : true // allow flash messages
//     }));
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
}
