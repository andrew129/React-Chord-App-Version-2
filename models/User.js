const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
// define the User model schema
const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        index: { unique: true },
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    // saved chords for a user update route
    savedChords: {
      type: Array
    }
});

UserSchema.methods = {
  checkPassword: function(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10);
  }
};

// Define hooks for pre-saving
UserSchema.pre("save", function(next) {
  if (!this.password) {
    console.log("models/user.js =======NO PASSWORD PROVIDED=======");
    next();
  } else {
    console.log("models/user.js hashPassword in pre save");
    this.password = this.hashPassword(this.password);
    next();
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;