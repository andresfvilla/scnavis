module.exports = function(app, passport) {

  var User            = require('../Users/model');
  var multer  = require('multer')
  var imageDest = app.config.imageDest
  var path = require('path');
  var fs = require('fs');
  var stream = require('stream');
  var crypto = require('crypto');
  var Grid = require('gridfs-stream');
  var sharp = require('sharp')
  var storage = multer.diskStorage({
    destination: imageDest,
    filename: function (req, file, cb) {
      var extension = path.extname(file.originalname).toUpperCase();
      if(extension !== '.JPG' && extension !== '.PNG'){
        cb(true, {"error": "Bad file extension"})
      }
      crypto.pseudoRandomBytes(16, function (err, raw) {
        if (err) return cb(err)
        cb(null, raw.toString('hex') + extension)
      })
    }
  })

  var upload = multer({ storage: storage, limits: {fileSize: 600000}})

  app.post('/api/image', upload.single('avatar'), function (req, res, next) {
      var filePath = app.config.imageDest + req.file.filename;

      sharp(filePath).resize(256, 256).ignoreAspectRatio().toBuffer(function(err, outputBuffer) {
        if (err) {
          throw err;
        }
        var writestream = app.gfs.createWriteStream({
             filename: req.file.filename
         });

         var bufferStream = new stream.PassThrough();
         bufferStream.end(outputBuffer);
         bufferStream.pipe(writestream)
         //fs.createReadStream(outputBuffer).pipe(writestream);

         writestream.on('close', function (file) {
            User.findOne({
                  _id: req.session.passport.user
              }, function(err, user) {
                  console.log('this is the user')
                  console.log(user)
                  user.local.profilePicture = req.file.filename;
                  user.save();
                  console.log(file.filename + 'Written To DB and updated for ', user.id);
              });
         });
         fs.unlink(filePath)
      })

  })

  // app.post('/api/image', function (req, res) {
  //   console.log(app.gfs);
  // })

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
