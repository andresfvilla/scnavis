var path = require('path');
var data_root = process.env.LAMBO_DATA || path.join(__dirname, "../data");
var PORT = process.env.PORT || 3000;
var URL = 'http://localhost:' + PORT;

module.exports = {
    env: process.env.NODE_ENV || "dev",
    seed: true,
    port: PORT,
    image: {
        noAvatarUrl: "",
        noImageUrl: "",
        // On image upload, resize images to these sizes
        sizes: [{
                name: "original",
                type: "original", //cover, original, contain, crop
                width: -1,
                height: -1
            }, {
                name: "large",
                type: "cover",
                width: 2040,
                height: 1360
            }, {
                name: "thumb",
                type: "cover",
                width: 450,
                height: 300
            }
            // avatar
            // medium
        ]
    },
    mongo: {
        uri: process.env.MONGO_URL || 'mongodb://localhost/mediator'
    },
    dataPath: function(relative) {
        return path.join(data_root, relative);
    },
    url: URL,
    index: path.join(__dirname, '../../build/index.html')
};
