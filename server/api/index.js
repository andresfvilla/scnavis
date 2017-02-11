module.exports = function(app) {
    var path = require('path');
    var debug = require('debug')(app.config.debug);
    var passport = require('passport');

    //Login template
    app.get('/login',
      function(req, res){
        res.render('login', { env: app.config.env });
      });

    // Perform session logout and redirect to homepage
    app.get('/logout', function(req, res){
      req.logout();
      res.redirect('/');
    });

    // Perform the final stage of authentication and redirect to '/user'
    app.get('/mycb',
      passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
      function(req, res) {
        res.redirect(req.session.returnTo || '/api/users');
    });

    function getAllTheThings(module, app) {
        var thing = {};
        try {
            thing.model = require('./' + module + '/model')(app);
        } catch (e) {
            if (!e.message.match(/cannot find module/gi)) {
                console.log(e.message);
            }
        }
        try {
            thing.svc = require('./' + module + '/svc')(app);
        } catch (e) {
            if (!e.message.match(/cannot find module/gi)) {
                console.log(e.message);
            }
        }
        thing.ctrl = require('./' + module + '/ctrl')(app);
        return thing;
    }

    // Order matters because of route priority.
    // Client should be last since it's the catch-all
    return {
        users: getAllTheThings('users', app)
        //client: getAllTheThings('client', app) // Must go last...
    };
};
