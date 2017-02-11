var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

//module.exports = function(app, passport) {

// Schema
var userSchema = new mongoose.Schema({
  local: {
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
  },
  facebook         : {
    id           : String,
    token        : String,
    email        : String,
    name         : String
  },
  twitter          : {
      id           : String,
      token        : String,
      displayName  : String,
      username     : String
  },
  google           : {
      id           : String,
      token        : String,
      email        : String,
      name         : String
  }
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);

// // Model
// var model = mongoose.model('users', schema);
// return model;
//};
