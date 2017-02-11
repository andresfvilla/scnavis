var mongoose = require('mongoose');

module.exports = function(app) {

    // Schema
    var schema = new mongoose.Schema({
        name: String,
        Leader: String,
        admins: [String],
        members: [String],
        wins: Number,
        losses: Number
    });


    // Model
    var model = mongoose.model('teams', schema);
    return model;
};
