// Load modules
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load authentication middleware
const requireAuth = passport.authenticate('jwt', { session: false });

// Load user controller
const userController = require('../api/user/userController');

/**
 * @api {get} /api/users Get Users
 * @apiGroup Users
 * @apiSuccess {Object[]} users User list
 * @apiSuccess {String} user.firstname User's first name
 * @apiSuccess {String} user.lastname User's last name
 * @apiSuccess {String} user.email User's email address
 * @apiSuccess {String} user.avatar User's avatar
 * @apiSuccess {String} user.position User's position
 * @apiSuccess {String} user.role User's priviledge role
 * @apiSuccess {String} user.phone User's phone number
 * @apiSuccess {String} user.privatePhone User's private phone number
 * @apiSuccess {String} user.privateEmail User's private email address
 * @apiSuccess {Number} user.workingHours How many hours does the User work per day?
 * @apiSuccess {String} user.group User's group
 * @apiSuccess {Date} user.registered When does the User registered?
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      firstname: 'John',
 *      lastname: 'Doe',
 *      email: 'john.doe@e-vista.hu',
 *      avatar: 'http://example.com/path/to/avatar.png',
 *      position: 'Frontend Developer',
 *      role: 'User',
 *      phone: '+36701234567',
 *      privatePhone: '+36707456321',
 *      privateEmail: 'john.doe@sample.com',
 *      workingHours: 8,
 *      group: 'Developer',
 *      registered: '2018-01-01T00:00:00.778Z'
 *    }]
 * @apiErrorExample {json} User Error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/', requireAuth, userController.all);

/**
 * @api {get} /api/users/:id Get User by ID
 * @apiGroup Users
 * @apiParam {id} id User ID
 * @apiSuccess {String} firstname User's first name
 * @apiSuccess {String} lastname User's last name
 * @apiSuccess {String} email User's email address
 * @apiSuccess {String} avatar User's avatar
 * @apiSuccess {String} position User's position
 * @apiSuccess {String} role User's priviledge role
 * @apiSuccess {String} phone User's phone number
 * @apiSuccess {String} privatePhone User's private phone number
 * @apiSuccess {String} privateEmail User's private email address
 * @apiSuccess {Number} workingHours How many hours does the User work per day?
 * @apiSuccess {String} group User's group
 * @apiSuccess {Date} registered When does the User registered?
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      firstname: 'John',
 *      lastname: 'Doe',
 *      email: 'john.doe@e-vista.hu',
 *      avatar: 'http://example.com/path/to/avatar.png',
 *      position: 'Frontend Developer',
 *      role: 'User',
 *      phone: '+36701234567',
 *      privatePhone: '+36707456321',
 *      privateEmail: 'john.doe@sample.com',
 *      workingHours: 8,
 *      group: 'Developer',
 *      registered: '2018-01-01T00:00:00.778Z'
 *    }
 * @apiErrorExample {json} User Not Found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} User Error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/:id', requireAuth, userController.getById);

/**
 * @api {get} /api/users/me Get current User
 * @apiGroup Users
 * @apiSuccess {String} firstname User's first name
 * @apiSuccess {String} lastname User's last name
 * @apiSuccess {String} email User's email address
 * @apiSuccess {String} avatar User's avatar
 * @apiSuccess {String} position User's position
 * @apiSuccess {String} role User's priviledge role
 * @apiSuccess {String} phone User's phone number
 * @apiSuccess {String} privatePhone User's private phone number
 * @apiSuccess {String} privateEmail User's private email address
 * @apiSuccess {Number} workingHours How many hours does the User work per day?
 * @apiSuccess {String} group User's group
 * @apiSuccess {Date} registered When does the User registered?
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      firstname: 'John',
 *      lastname: 'Doe',
 *      email: 'john.doe@e-vista.hu',
 *      avatar: 'http://example.com/path/to/avatar.png',
 *      position: 'Frontend Developer',
 *      role: 'User',
 *      phone: '+36701234567',
 *      privatePhone: '+36707456321',
 *      privateEmail: 'john.doe@sample.com',
 *      workingHours: 8,
 *      group: 'Developer',
 *      registered: '2018-01-01T00:00:00.778Z'
 *    }
 * @apiErrorExample {json} User Not Found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} User Error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/me', requireAuth, userController.current);

/**
 * @api {put} /api/users/:id Update User by ID
 * @apiGroup Users
 * @apiParam {id} id User ID
 * @apiSuccess {String} firstname User's first name
 * @apiSuccess {String} lastname User's last name
 * @apiSuccess {String} email User's email address
 * @apiSuccess {String} avatar User's avatar
 * @apiSuccess {String} position User's position
 * @apiSuccess {String} role User's priviledge role
 * @apiSuccess {String} phone User's phone number
 * @apiSuccess {String} privatePhone User's private phone number
 * @apiSuccess {String} privateEmail User's private email address
 * @apiSuccess {Number} workingHours How many hours does the User work per day?
 * @apiSuccess {String} group User's group
 * @apiSuccess {Date} registered When does the User registered?
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      firstname: 'John',
 *      lastname: 'Doe',
 *      email: 'john.doe@e-vista.hu',
 *      avatar: 'http://example.com/path/to/avatar.png',
 *      position: 'Frontend Developer',
 *      role: 'User',
 *      phone: '+36701234567',
 *      privatePhone: '+36707456321',
 *      privateEmail: 'john.doe@sample.com',
 *      workingHours: 8,
 *      group: 'Developer',
 *      registered: '2018-01-01T00:00:00.778Z'
 *    }
 * @apiErrorExample {json} User Not Found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} User Error
 *    HTTP/1.1 500 Internal Server Error
 */
router.put('/:id', requireAuth, userController.update);

/**
 * @api {put} /api/users/:id/changePassword Change User password by ID
 * @apiGroup Users
 * @apiParam {id} id User ID
 * @apiSuccess {String} firstname User's first name
 * @apiSuccess {String} lastname User's last name
 * @apiSuccess {String} email User's email address
 * @apiSuccess {String} avatar User's avatar
 * @apiSuccess {String} position User's position
 * @apiSuccess {String} role User's priviledge role
 * @apiSuccess {String} phone User's phone number
 * @apiSuccess {String} privatePhone User's private phone number
 * @apiSuccess {String} privateEmail User's private email address
 * @apiSuccess {Number} workingHours How many hours does the User work per day?
 * @apiSuccess {String} group User's group
 * @apiSuccess {Date} registered When does the User registered?
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      firstname: 'John',
 *      lastname: 'Doe',
 *      email: 'john.doe@e-vista.hu',
 *      avatar: 'http://example.com/path/to/avatar.png',
 *      position: 'Frontend Developer',
 *      role: 'User',
 *      phone: '+36701234567',
 *      privatePhone: '+36707456321',
 *      privateEmail: 'john.doe@sample.com',
 *      workingHours: 8,
 *      group: 'Developer',
 *      registered: '2018-01-01T00:00:00.778Z'
 *    }
 * @apiErrorExample {json} User Not Found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} User Error
 *    HTTP/1.1 500 Internal Server Error
 */
router.put('/:id/changePassword', requireAuth, userController.changePassword);

/**
 * @api {put} /api/users/:id/unsetAvatar Remove User avatar by ID
 * @apiGroup Users
 * @apiParam {id} id User ID
 * @apiSuccess {String} firstname User's first name
 * @apiSuccess {String} lastname User's last name
 * @apiSuccess {String} email User's email address
 * @apiSuccess {String} avatar User's avatar
 * @apiSuccess {String} position User's position
 * @apiSuccess {String} role User's priviledge role
 * @apiSuccess {String} phone User's phone number
 * @apiSuccess {String} privatePhone User's private phone number
 * @apiSuccess {String} privateEmail User's private email address
 * @apiSuccess {Number} workingHours How many hours does the User work per day?
 * @apiSuccess {String} group User's group
 * @apiSuccess {Date} registered When does the User registered?
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      firstname: 'John',
 *      lastname: 'Doe',
 *      email: 'john.doe@e-vista.hu',
 *      avatar: 'http://example.com/path/to/avatar.png',
 *      position: 'Frontend Developer',
 *      role: 'User',
 *      phone: '+36701234567',
 *      privatePhone: '+36707456321',
 *      privateEmail: 'john.doe@sample.com',
 *      workingHours: 8,
 *      group: 'Developer',
 *      registered: '2018-01-01T00:00:00.778Z'
 *    }
 * @apiErrorExample {json} User Not Found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} User Error
 *    HTTP/1.1 500 Internal Server Error
 */
router.put('/:id/unsetAvatar', requireAuth, userController.unsetAvatar);



/**
 * @api {delete} /api/users/:id Delete User by ID
 * @apiGroup Users
 * @apiParam {id} id User ID
 * @apiSuccess {String} firstname User's first name
 * @apiSuccess {String} lastname User's last name
 * @apiSuccess {String} email User's email address
 * @apiSuccess {String} avatar User's avatar
 * @apiSuccess {String} position User's position
 * @apiSuccess {String} role User's priviledge role
 * @apiSuccess {String} phone User's phone number
 * @apiSuccess {String} privatePhone User's private phone number
 * @apiSuccess {String} privateEmail User's private email address
 * @apiSuccess {Number} workingHours How many hours does the User work per day?
 * @apiSuccess {String} group User's group
 * @apiSuccess {Date} registered When does the User registered?
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      firstname: 'John',
 *      lastname: 'Doe',
 *      email: 'john.doe@e-vista.hu',
 *      avatar: 'http://example.com/path/to/avatar.png',
 *      position: 'Frontend Developer',
 *      role: 'User',
 *      phone: '+36701234567',
 *      privatePhone: '+36707456321',
 *      privateEmail: 'john.doe@sample.com',
 *      workingHours: 8,
 *      group: 'Developer',
 *      registered: '2018-01-01T00:00:00.778Z'
 *    }
 * @apiErrorExample {json} User Not Found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} User Error
 *    HTTP/1.1 500 Internal Server Error
 */
router.delete('/:id', requireAuth, userController.delete);

module.exports = router;