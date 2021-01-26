// Load modules
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load authentication middleware
const requireAuth = passport.authenticate('jwt', { session: false });

// Load client controller
const clientController = require('../api/client/clientController');

/**
 * @api { get } /api/clients Get Client list
 * @apiGroup Clients
 * @apiSuccess { Object[] } clients Client list
 * @apiSuccess { String } client.company Client's company name
 * @apiSuccess { String } client.email Client's email address
 * @apiSuccess { String } client.phone Client's phone number
 * @apiSuccess { String } client.website Client's website
 * @apiSuccess { String } client.logo Client's logo
 * @apiSuccess { String } client.contact Client's contact member's name
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      company: 'Lorem Ipsum Ltd',
 *      email: 'email@company.com',
 *      phone: '+36701234567',
 *      webite: 'http://example.com',
 *      logo: 'http://example.com/path/to/logo.png',
 *      contact: 'John Doe'
 *    }]
 * @apiErrorExample {json} Client Error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/', requireAuth, clientController.all);

/**
 * @api { get } /api/clients/:id Get client by ID
 * @apiGroup Clients
 * @apiParam {id} id Client ID
 * @apiSuccess { String } company Client's company name
 * @apiSuccess { String } email Client's email address
 * @apiSuccess { String } phone Client's phone number
 * @apiSuccess { String } website Client's website
 * @apiSuccess { String } logo Client's logo
 * @apiSuccess { String } contact Client's contact member's name
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      company: 'Lorem Ipsum Ltd',
 *      email: 'email@company.com',
 *      phone: '+36701234567',
 *      webite: 'http://example.com',
 *      logo: 'http://example.com/path/to/logo.png',
 *      contact: 'John Doe'
 *    }
 * @apiErrorExample {json} Client Not Found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Client Error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/:id', requireAuth, clientController.getById);

/**
 * @api { post } /api/clients Create new client
 * @apiGroup Clients
 * @apiSuccess { String } company Client's company name
 * @apiSuccess { String } email Client's email address
 * @apiSuccess { String } phone Client's phone number
 * @apiSuccess { String } website Client's website
 * @apiSuccess { String } logo Client's logo
 * @apiSuccess { String } contact Client's contact member's name
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      company: 'Lorem Ipsum Ltd',
 *      email: 'email@company.com',
 *      phone: '+36701234567',
 *      webite: 'http://example.com',
 *      logo: 'http://example.com/path/to/logo.png',
 *      contact: 'John Doe'
 *    }
 * @apiErrorExample {json} Client Already Exists
 *    HTTP/1.1 409 Conflict
 * @apiErrorExample {json} Client Error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/', requireAuth, clientController.create);

/**
 * @api { put } /api/clients/:id/unsetLogo Remove Client logo
 * @apiGroup Clients
 * @apiParam {id} id Client ID
 * @apiSuccess { String } company Client's company name
 * @apiSuccess { String } email Client's email address
 * @apiSuccess { String } phone Client's phone number
 * @apiSuccess { String } website Client's website
 * @apiSuccess { String } contact Client's contact member's name
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      company: 'Lorem Ipsum Ltd',
 *      email: 'email@company.com',
 *      phone: '+36701234567',
 *      webite: 'http://example.com',
 *      contact: 'John Doe'
 *    }
 * @apiErrorExample {json} Client Not Found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Client Error
 *    HTTP/1.1 500 Internal Server Error
 */
router.put('/:id/unsetLogo', requireAuth, clientController.unsetLogo);

/**
 * @api { put } /api/clients/:id Update Client by ID
 * @apiGroup Clients
 * @apiParam {id} id Client ID
 * @apiSuccess { String } company Client's company name
 * @apiSuccess { String } email Client's email address
 * @apiSuccess { String } phone Client's phone number
 * @apiSuccess { String } website Client's website
 * @apiSuccess { String } logo Client's logo
 * @apiSuccess { String } contact Client's contact member's name
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      company: 'Lorem Ipsum Ltd',
 *      email: 'email@company.com',
 *      phone: '+36701234567',
 *      webite: 'http://example.com',
 *      logo: 'http://example.com/path/to/logo.png',
 *      contact: 'John Doe'
 *    }
 * @apiErrorExample {json} Client Not Found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Client Error
 *    HTTP/1.1 500 Internal Server Error
 */
router.put('/:id', requireAuth, clientController.update);


/**
 * @api { delete } /api/clients/:id Delete Client by ID
 * @apiGroup Clients
 * @apiParam {id} id Client ID
 * @apiSuccess { String } company Client's company name
 * @apiSuccess { String } email Client's email address
 * @apiSuccess { String } phone Client's phone number
 * @apiSuccess { String } website Client's website
 * @apiSuccess { String } logo Client's logo
 * @apiSuccess { String } contact Client's contact member's name
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      company: 'Lorem Ipsum Ltd',
 *      email: 'email@company.com',
 *      phone: '+36701234567',
 *      webite: 'http://example.com',
 *      logo: 'http://example.com/path/to/logo.png',
 *      contact: 'John Doe'
 *    }
 * @apiErrorExample {json} Client Not Found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Client Error
 *    HTTP/1.1 500 Internal Server Error
 */
router.delete('/:id', requireAuth, clientController.delete);

module.exports = router;