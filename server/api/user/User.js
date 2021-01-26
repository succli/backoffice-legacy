// Load modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Create User Schema
const userSchema = new Schema({
  firstname: String,
  lastname: String,
  email: { type: String, unique: true },
  password: String,
  avatar: String,
  position: String,
  role: { type: String, enum: ['Administrator', 'User'], default: 'User' },
  phone: String,
  privatePhone: String,
  privateEmail: { type: String, default: '' },
  workingHours: { type: Number, default: 8},
  group: { type: String, enum: ['Management', 'Developer', 'Design', 'None'], default: 'None' },
  registered: { type: Date, default: new Date() }
});

/**
 * Generating password hash before saving User
 */
userSchema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, (error, salt) => {
    if (error) {
      return next(error);
    }
    
    bcrypt.hash(user.password, salt, null, (error, hash) => {
      if (error) {
        return next(error);
      }

      user.password = hash;
      next();
    })
  })
})

/**
 * Validates given password with the user's hash
 * @param {String} password 
 * @param {String} hash 
 */
userSchema.methods.validPassword = function (password, hash) {
  return bcrypt.compareSync(password, hash);
}

module.exports = mongoose.model('user', userSchema);