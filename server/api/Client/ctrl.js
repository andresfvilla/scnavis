module.exports = function(app, passport) {
  app.get('*', (req, res) => {
    match(
      { routes, location: req.url },
      (err, redirectLocation, renderProps) => {

        // in case of error display the error message
        if (err) {
          return res.status(500).send(err.message);
        }

        // in case of redirect propagate the redirect to the browser
        if (redirectLocation) {
          return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        }

        // generate the React markup for the current route
        let markup;
        if (renderProps) {
          // if the current route matched we have renderProps
          markup = renderToString(<RouterContext {...renderProps}/>);
        } else {
          // otherwise we can render a 404 page
          markup = renderToString(<NotFoundPage/>);
          res.status(404);
        }

        // render the index template with the embedded React markup
        return res.render('index', { markup });
      }
    );
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
//
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
//     // universal routing and rendering
//     app.get('*', (req, res) => {
//       match(
//         { routes, location: req.url },
//         (err, redirectLocation, renderProps) => {
//
//           // in case of error display the error message
//           if (err) {
//             return res.status(500).send(err.message);
//           }
//
//           // in case of redirect propagate the redirect to the browser
//           if (redirectLocation) {
//             return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
//           }
//
//           // generate the React markup for the current route
//           let markup;
//           if (renderProps) {
//             // if the current route matched we have renderProps
//             markup = renderToString(<RouterContext {...renderProps}/>);
//           } else {
//             // otherwise we can render a 404 page
//             markup = renderToString(<NotFoundPage/>);
//             res.status(404);
//           }
//
//           // render the index template with the embedded React markup
//           return res.render('index', { markup });
//         }
//       );
//     });
//
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
