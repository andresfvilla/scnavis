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

};
