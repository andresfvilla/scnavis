var path = require('path');
var PORT = process.env.PORT || 3000;
var URL = 'http://localhost:' + PORT;

module.exports = {
    env: process.env.NODE_ENV || "dev",
    seed: true,
    port: PORT,
    mongo: {
        uri: process.env.MONGO_URL || 'mongodb://localhost/scnavis'
    },
    url: URL,
    index: path.join(__dirname, '../../src/static/index.html')
};
