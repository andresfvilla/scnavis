module.exports = function(app) {
    var request = require('request');


    app.get('/api/teams', function(req, res) {
        app.api.teams.model.find(function(err, users) {
            if (err) {
                return console.log(err);
            }
            res.json(users);
        });
    });

};
