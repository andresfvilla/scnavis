module.exports = function(app, passport) {
    var request = require('request');

    app.get('/api/users', function(req, res) {
        app.api.users.model.find(function(err, users) {
            if (err) {
                return console.log(err);
            }
            res.json(users);
        });
    });

};
