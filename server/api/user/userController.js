// Load modules
const jwt = require('jsonwebtoken');

// Load User model
const User = require('./User');

module.exports = {

  /**
   * Get Users from database and returns them as a JSON object
   * REST endpoint: GET /api/users
   * @param {Object} req Request object
   * @param {Object} res Result object
   */
  all: function (req, res) {
    User.find()
      .select({ password: 0, __v: 0 })
      .exec((error, users) => {
        if (error) {
          return res.status(500).json({
            message: 'Error getting user list.',
            error
          });
        }
  
        return res.status(200).json({
          users
        });
      });
  }, 

  /**
   * Get User by ID from database and returns it as a JSON object
   * REST endpoint: GET /api/users/:id
   * @param {Object} req Request object
   * @param {Object} res Result object
   */
  getById: function (req, res) {
    User.findById(req.params.id)
      .select({ password: 0, __v: 0 })
      .exec((error, user) => {
        if (error) {
          return res.status(500).json({
            message: 'Error getting user.',
            error
          });
        }

        if (!user) {
          return res.status(404).json({
            message: 'User don\'t exists'
          });
        }

        return res.status(200).json({ user })
      })
  },

  /**
   * Updates User by ID and returns updated data as a JSON object
   * REST endpoint: PUT /api/users/:id
   * @param {Object} req Request object
   * @param {Object} res Result object
   */
  update: function (req, res) {
    User.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true})
      .select({ __v: 0, password: 0 })
      .exec((error, user) => {
        if (error) {
          return res.state(500).json({
            message: 'Error updating user.',
            error
          });
        }

        if (!user) {
          return res.status(404).json({
            message: 'User don\'t exists'
          });
        }
        
        return res.status(200).json({ 
          message: 'Successfully updated user.',
          user
        });
      });
  },

  /**
   * Updates User password by ID and returns updated data as a JSON object
   * REST endpoint: PUT /api/users/:id/changePassword
   * @param {Object} req Request object
   * @param {Object} res Result object
   */
  changePassword: function (req, res) {
    User.findById(req.params.id)
      .select({ __v: 0 })
      .exec((error, user) => {
        if (error) {
          return res.status(500).json({
            message: 'Error getting user.',
            error
          });
        }

        if (!user) {
          return res.status(404).json({
            message: 'User does not exists.'
          });
        }

        if (!user.validPassword(req.body.password, user.password)) {
          delete user.password;
          return res.status(401).json({
            message: 'Old password does not match.',
            user
          });
        } else {
          user.password = req.body.new_password;
          user.save((error, user) => {
            if (error) {
              return res.status(500).json({
                message: 'Error saving user.',
                error
              });
            }

            delete user.password;

            return res.status(200).json({
              message: 'Successfully changed password.',
              user
            });
          });
        }        
      });
  },

  /**
   * Unsets User's avatar and returns updated data as a JSON object
   * REST endpoint: PUT /api/users/:id/unsetAvatar
   * @param {Object} req Request object
   * @param {Object} res Result object
   */
  unsetAvatar: function (req, res) {
    User.findByIdAndUpdate(req.params.id, { $unset: { avatar: '' } }, {new: true})
      .select({ __v: 0, password: 0 })  
      .exec((error, user) => {
        if (error) {
          return res.status(500).json({
            message: 'Error deleting user.',
            error
          });
        }

        if (!user) {
          return res.status(404).json({
            message: 'User don\'t exists.'
          });
        }

        return res.status(200).json({
          message: 'Successfully deleted user avatar',
          user
        });
      });
  },

  /**
   * Delete User by ID and returns deleted data as a JSON object
   * REST endpoint: DELETE /api/users/:id
   * @param {Object} req Request object
   * @param {Object} res Result object
   */
  delete: function(req, res) {
    User.findByIdAndRemove(req.params.id, (error, user) => {
      if (error) {
        return res.status(500).json({
          message: 'Error deleting user.',
          error
        });
      }

      if (!user) {
        return res.status(404).json({
          message: 'User don\'t exists.'
        });
      }

      return res.status(200).json({
        message: 'Successfully deleted user',
        user
      });
    })
  },

  /**
   * Get current User by token and returns as a JSON object
   * REST endpoint: GET /api/users/me
   * @param {Object} req Request object
   * @param {Object} res Result object
   */
  current: function(req, res) {
    jwt.verify(req.body.token, process.env.SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).json(error);
      }

      User.findById(decoded.sub)
        .select({ password: 0, __v: 0 })
        .exec((error, user) => {
          if (error) {
            return res.status(500).json({
              message: 'Error getting user.',
              error
            });
          }

          if (!user) {
            return res.status(404).json({
              message: 'User don\'t exists'
            });
          }

          return res.status(200).json({ user });
        });
    });
  }
}