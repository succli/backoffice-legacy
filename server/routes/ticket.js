// Load modules
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load authentication middleware
const requireAuth = passport.authenticate('jwt', { session: false });

// Load ticket controller
const ticketController = require('../api/ticket/ticketController');

/**
 * @api { get } /api/tickets Get Tickets
 * @apiGroup Tickets
 * @apiSuccess { Object[] } tickets Ticket list
 * @apiSuccess { String } ticket.name Ticket's name
 * @apiSuccess { Date } ticket.startdate Ticket's created date
 * @apiSuccess { Date } ticket.duedate Ticket's due date
 * @apiSuccess { Number } ticket.priority Ticket's priority
 * @apiSuccess { String } ticket.description Ticket's description
 * @apiSuccess { Number } ticket.estimated Ticket's estimated hours
 * @apiSuccess { String } ticket.hyperlink Ticket's outer hyperlink
 * @apiSuccess { ObjectId } ticket.user User's ID
 * @apiSuccess { ObjectId } ticket.client Client's ID
 * @apiSuccess { Boolean } ticket.closed Is ticket closed?
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      name: 'Example Ticket',
 *      startdate: '2018-01-01T00:00:00.778Z',
 *      duedate: '2018-01-15T00:00:00.778Z',
 *      priority: 0,
 *      description: 'Lorem ipsum dolor sit amet',
 *      estimated: 4,
 *      hyperlink: 'http://example.com/:ticket',
 *      user: '5abfcd6d66ea260656e78487',
 *      client: '5ad8ce0ca7828d0416663123',
 *      closed: false
 *    }]
 * @apiErrorExample {json} Ticket Error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/', requireAuth, ticketController.all);

/**
 * @api { get } /api/tickets/:id Get Ticket by ID
 * @apiGroup Tickets
 * @apiParams {id} id Ticket ID
 * @apiSuccess { String } name Ticket's name
 * @apiSuccess { Date } startdate Ticket's created date
 * @apiSuccess { Date } duedate Ticket's due date
 * @apiSuccess { Number } priority Ticket's priority
 * @apiSuccess { String } description Ticket's description
 * @apiSuccess { Number } estimated Ticket's estimated hours
 * @apiSuccess { String } hyperlink Ticket's outer hyperlink
 * @apiSuccess { ObjectId } user User's ID
 * @apiSuccess { ObjectId } client Client's ID
 * @apiSuccess { Boolean } closed Is ticket closed?
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      name: 'Example Ticket',
 *      startdate: '2018-01-01T00:00:00.778Z',
 *      duedate: '2018-01-15T00:00:00.778Z',
 *      priority: 0,
 *      description: 'Lorem ipsum dolor sit amet',
 *      estimated: 4,
 *      hyperlink: 'http://example.com/:ticket',
 *      user: '5abfcd6d66ea260656e78487',
 *      client: '5ad8ce0ca7828d0416663123',
 *      closed: false
 *    }
 * @apiErrorExample {json} Ticket Not Found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Ticket Error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/:id', requireAuth, ticketController.getById);

/**
 * @api { get } /api/tickets/client/:id Get Tickets by Client ID
 * @apiGroup Tickets
 * @apiParams {id} id Client ID
 * @apiSuccess { Object[] } tickets Ticket list
 * @apiSuccess { String } ticket.name Ticket's name
 * @apiSuccess { Date } ticket.startdate Ticket's created date
 * @apiSuccess { Date } ticket.duedate Ticket's due date
 * @apiSuccess { Number } ticket.priority Ticket's priority
 * @apiSuccess { String } ticket.description Ticket's description
 * @apiSuccess { Number } ticket.estimated Ticket's estimated hours
 * @apiSuccess { String } ticket.hyperlink Ticket's outer hyperlink
 * @apiSuccess { ObjectId } ticket.user User's ID
 * @apiSuccess { ObjectId } ticket.client Client's ID
 * @apiSuccess { Boolean } ticket.closed Is ticket closed?
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      name: 'Example Ticket',
 *      startdate: '2018-01-01T00:00:00.778Z',
 *      duedate: '2018-01-15T00:00:00.778Z',
 *      priority: 0,
 *      description: 'Lorem ipsum dolor sit amet',
 *      estimated: 4,
 *      hyperlink: 'http://example.com/:ticket',
 *      user: '5abfcd6d66ea260656e78487',
 *      client: '5ad8ce0ca7828d0416663123',
 *      closed: false
 *    }]
 * @apiErrorExample {json} Ticket Error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/client/:id', requireAuth, ticketController.getByClient);

/**
 * @api { get } /api/tickets/user/:id Get Tickets by User ID
 * @apiGroup Tickets
 * @apiParams {id} id User ID
 * @apiSuccess { Object[] } tickets Ticket list
 * @apiSuccess { String } ticket.name Ticket's name
 * @apiSuccess { Date } ticket.startdate Ticket's created date
 * @apiSuccess { Date } ticket.duedate Ticket's due date
 * @apiSuccess { Number } ticket.priority Ticket's priority
 * @apiSuccess { String } ticket.description Ticket's description
 * @apiSuccess { Number } ticket.estimated Ticket's estimated hours
 * @apiSuccess { String } ticket.hyperlink Ticket's outer hyperlink
 * @apiSuccess { ObjectId } ticket.user User's ID
 * @apiSuccess { ObjectId } ticket.client Client's ID
 * @apiSuccess { Boolean } ticket.closed Is ticket closed?
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      name: 'Example Ticket',
 *      startdate: '2018-01-01T00:00:00.778Z',
 *      duedate: '2018-01-15T00:00:00.778Z',
 *      priority: 0,
 *      description: 'Lorem ipsum dolor sit amet',
 *      estimated: 4,
 *      hyperlink: 'http://example.com/:ticket',
 *      user: '5abfcd6d66ea260656e78487',
 *      client: '5ad8ce0ca7828d0416663123',
 *      closed: false
 *    }]
 * @apiErrorExample {json} Ticket Error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/user/:id', requireAuth, ticketController.getByUser);

/**
 * @api { post } /api/tickets Create new ticket
 * @apiGroup Tickets
 * @apiSuccess { String } name Ticket's name
 * @apiSuccess { Date } startdate Ticket's created date
 * @apiSuccess { Date } duedate Ticket's due date
 * @apiSuccess { Number } priority Ticket's priority
 * @apiSuccess { String } description Ticket's description
 * @apiSuccess { Number } estimated Ticket's estimated hours
 * @apiSuccess { String } hyperlink Ticket's outer hyperlink
 * @apiSuccess { ObjectId } user User's ID
 * @apiSuccess { ObjectId } client Client's ID
 * @apiSuccess { Boolean } closed Is ticket closed?
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      name: 'Example Ticket',
 *      startdate: '2018-01-01T00:00:00.778Z',
 *      duedate: '2018-01-15T00:00:00.778Z',
 *      priority: 0,
 *      description: 'Lorem ipsum dolor sit amet',
 *      estimated: 4,
 *      hyperlink: 'http://example.com/:ticket',
 *      user: '5abfcd6d66ea260656e78487',
 *      client: '5ad8ce0ca7828d0416663123',
 *      closed: false
 *    }
 * @apiErrorExample {json} Ticket Error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/', requireAuth, ticketController.create);

/**
 * @api { put } /api/tickets/:id Update Ticket by ID
 * @apiGroup Tickets
 * @apiParams {id} id Ticket ID
 * @apiSuccess { String } name Ticket's name
 * @apiSuccess { Date } startdate Ticket's created date
 * @apiSuccess { Date } duedate Ticket's due date
 * @apiSuccess { Number } priority Ticket's priority
 * @apiSuccess { String } description Ticket's description
 * @apiSuccess { Number } estimated Ticket's estimated hours
 * @apiSuccess { String } hyperlink Ticket's outer hyperlink
 * @apiSuccess { ObjectId } user User's ID
 * @apiSuccess { ObjectId } client Client's ID
 * @apiSuccess { Boolean } closed Is ticket closed?
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      name: 'Example Ticket',
 *      startdate: '2018-01-01T00:00:00.778Z',
 *      duedate: '2018-01-15T00:00:00.778Z',
 *      priority: 0,
 *      description: 'Lorem ipsum dolor sit amet',
 *      estimated: 4,
 *      hyperlink: 'http://example.com/:ticket',
 *      user: '5abfcd6d66ea260656e78487',
 *      client: '5ad8ce0ca7828d0416663123',
 *      closed: false
 *    }
 * @apiErrorExample {json} Ticket Not Found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Ticket Error
 *    HTTP/1.1 500 Internal Server Error
 */
router.put('/:id', requireAuth, ticketController.update);

/**
 * @api { delete } /api/tickets/:id Delete Ticket by ID
 * @apiGroup Tickets
 * @apiParams {id} id Ticket ID
 * @apiSuccess { String } name Ticket's name
 * @apiSuccess { Date } startdate Ticket's created date
 * @apiSuccess { Date } duedate Ticket's due date
 * @apiSuccess { Number } priority Ticket's priority
 * @apiSuccess { String } description Ticket's description
 * @apiSuccess { Number } estimated Ticket's estimated hours
 * @apiSuccess { String } hyperlink Ticket's outer hyperlink
 * @apiSuccess { ObjectId } user User's ID
 * @apiSuccess { ObjectId } client Client's ID
 * @apiSuccess { Boolean } closed Is ticket closed?
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      name: 'Example Ticket',
 *      startdate: '2018-01-01T00:00:00.778Z',
 *      duedate: '2018-01-15T00:00:00.778Z',
 *      priority: 0,
 *      description: 'Lorem ipsum dolor sit amet',
 *      estimated: 4,
 *      hyperlink: 'http://example.com/:ticket',
 *      user: '5abfcd6d66ea260656e78487',
 *      client: '5ad8ce0ca7828d0416663123',
 *      closed: false
 *    }
 * @apiErrorExample {json} Ticket Not Found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Ticket Error
 *    HTTP/1.1 500 Internal Server Error
 */
router.delete('/:id', requireAuth, ticketController.delete);

module.exports = router;