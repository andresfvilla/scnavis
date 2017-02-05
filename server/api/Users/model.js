module.exports = function(app) {
    var mongoose = require('mongoose');

    // Schema
    var schema = new mongoose.Schema({
        name: String,
        rsiHandle: String,
        username: String,
        email: String,
        timezone: String,
        password: String,
        organization: [String],
        teams: [String],
        wins: Number,
        losses: Number,
        kills: Number,
        deaths: Number
    });


    // Model
    var model = mongoose.model('users', schema);
    return model;
};
