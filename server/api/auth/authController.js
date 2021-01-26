// Load modules
const jwt = require('jsonwebtoken');

// Load User model
const User = require('../user/User');

/**
 * Generate JSON web token and returns it
 * @param {Object} user User entity
 */
function generateToken (user) {
  return jwt.sign({ sub: user.id }, process.env.SECRET, { expiresIn: '1d' });
}

module.exports = {

  /**
   * Login method which is called after Passport middleware run successfully
   * Returns generated JSON web token after successfull login
   * REST endpoint: POST /api/auth/login
   * @param {Object} req Request object
   * @param {Object} res Result object
   * @param {Function} next Next function
   */
  login: function (req, res, next) {    
    return res.status(200).json({ 
      token: generateToken(req.user)
    });
  },

  /**
   * Creates new user
   * REST endpoint: POST /api/auth/signup
   * @param {Object} req Request object
   * @param {Object} res Result object
   * @param {Function} next Next function
   */
  signup: function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    if (!email || !password) {
      return res.status(422).json({ error: 'You must provide email and password.' });
    }

    User.findOne({ email }, (error, existingUser) => {
      if (error) {
        return next(error);
      }

      if (existingUser) {
        return res.status(422).json({ error: 'Email address is already in use.' });
      }

      const user = new User({
        email,
        password,
        firstname,
        lastname
      });

      user.save(error => {
        if (error) {
          return next(error);
        }

        return res.status(200).json({ token: generateToken(user) });
      });
    });
  }
}
