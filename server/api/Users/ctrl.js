module.exports = function(app) {
    var request = require('request');
    var apiKey = 'KR2htVYSHtcon3CGp2GETbAgNFFvYAXw';
    var salt = "$2a$10$0D9EdeLzhglYlLebNboIRu";


    app.get('/api/users', function(req, res) {
        app.api.users.model.find(function(err, users) {
            if (err) {
                return console.log(err);
            }
            res.json(users);
        });
    });

};
