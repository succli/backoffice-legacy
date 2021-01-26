// Load modules
const passport = require('passport');
const express = require('express');
const router = express.Router();

// Load auth controller and customized passport service
const authController = require('../api/auth/authController');
const passportService = require('../api/auth/passport');

// Setup authentication rules
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });


/**
 * @api { post } /api/auth/login Login user
 * @apiGroup Authentication
 * @apiSuccess { String } token JWT Token
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YWJmY2Q2ZDY2ZWEyNjA2NTZlNzg0ODciLCJpYXQiOjE1MjU1MzAzMTYsImV4cCI6MTUyNTYxNjcxNn0.dIWEs5A8J7yTImvDoSEMqRcRdlZ7wBWdF8a1Eo_T5Bo"
 *    }
 * @apiErrorExample {json} Unauthorized request
 *    HTTP/1.1 401 Unauthorized
 * @apiErrorExample {json} Login Error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/login', requireLogin, authController.login);

/**
 * @api { post } /api/auth/signup Sign up user
 * @apiGroup Authentication
 * @apiSuccess { String } token JWT Token
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YWJmY2Q2ZDY2ZWEyNjA2NTZlNzg0ODciLCJpYXQiOjE1MjU1MzAzMTYsImV4cCI6MTUyNTYxNjcxNn0.dIWEs5A8J7yTImvDoSEMqRcRdlZ7wBWdF8a1Eo_T5Bo"
 *    }
 * @apiErrorExample {json} Wrong data
 *    HTTP/1.1 422 Unprocessable Entity
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/signup', authController.signup);

module.exports = router;