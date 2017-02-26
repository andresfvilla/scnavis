module.exports = function(app) {

  var multer  = require('multer')
  var imageDest = app.config.imageDest
  var path = require('path');
  var fs = require('fs');
  var crypto = require('crypto');

  var storage = multer.diskStorage({
    destination: imageDest,
    filename: function (req, file, cb) {
      console.log('testing the filename')
      var extension = file.mimetype;
      if(extension !== ".jpg" && extension !== ".png"){
        cb(true, {"error": "Bad file extension"})

      }
      crypto.pseudoRandomBytes(16, function (err, raw) {
        if (err) return cb(err)
        cb(null, raw.toString('hex') + extension)
      })
    }
  })

  var upload = multer({ storage: storage })

  app.post('/profile', upload.single('avatar'), function (req, res, next) {
  })

  app.get('/api/images/:shortcode', function(req, res) {
      app.api.images.model.findOne({
          shortcode: req.params.shortcode
      }, function(err, img) {
          if (err) {
              res.status(500).json({
                  error: err
              });
          } else {
              res.status(200);
          }
      });
  });

  app.get('/api/images', function(req, res) {
      app.api.images.model.find(function(err, imgs) {
          if (err) {
              return console.log(err);
          }
          res.json(imgs);
      });
  });

  app.get('/api/images/tag/:tag', function(req, res) {
      var tag = req.params.tag;
      app.api.images.model.find({
          tags: tag
      }, function(err, imgs) {
          if (err) {
              return console.log(err);
          }
          res.json(imgs);
      });
  });

  app.delete('/api/images/:shortcode', function(req, res) {
      app.api.images.model.findOne({
          shortcode: req.params.shortcode
      }, function(err, img) {
          if (err) {
              return res.status(500).json({
                  error: err
              });
          }

          img.remove(function(err) {
              if (err) {
                  res.status(500).json({
                      error: err
                  });
              } else {
                  res.status(204).send();
              }
          });
      });
  });
};
