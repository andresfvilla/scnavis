var path = require('path');
var data_root = process.env.LAMBO_DATA || path.join(__dirname, "../data");
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
    index: path.join(__dirname, '../../build/index.html'),
    auth: {
        AUTH0_DOMAIN: andresvilla.auth0.com
        AUTH0_CLIENT_ID: Vb2rwNyhtYmPXbBxRrYAvtFyNyBgIXnI
        AUTH0_CLIENT_SECRET: MMqtmJBmzSpQy5JRssfeYMmCTkzC1sT4giBWBq_9MZLwlk9nCDp7MZNoIF-m3dly
        AUTH0_CALLBACK_URL:
    }
};

domain:       process.env.AUTH0_DOMAIN,
    clientID:     process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:  process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
