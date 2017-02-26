var multer = require('multer');
var uuid = require('node-uuid');
var config = require('config');
var debug = require('debug')(config.debug);

module.exports = function(app) {
    app.use(multer({
        dest: config.dataPath('/uploads'),
        limits: {
            fileSize: 50 * 1000000
        },
        rename: function(fieldname, filename) {
            return uuid.v4();
        },
        onFileUploadStart: function(file) {
            debug.log("STARTING FILE UPLOAD:", file);
        },
        onFileUploadComplete: function(file) {
            debug.log("UPLOAD COMPLETE:", file);
        }
    }));
};
