module.exports = function(app) {
    var mongoose = require('mongoose');

    // Schema
    var schema = new mongoose.Schema({
        shortcode: {
            type: String,
            required: true,
            index: {
                unique: true
            },
            default: "somethingiswrong"
        },
        extension: {
            type: String,
            required: true
        },
        created: {
            type: Date,
            default: Date.now
        },
        tags: {
            type: Array,
            default: []
        },
        original: {
            type: String,
            required: false
        },
        urls: {
            type: Object,
            default: {}
        }
    });


    // Model
    var model = mongoose.model('Img', schema);
    return model;
};
