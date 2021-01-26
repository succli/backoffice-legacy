// Load modules
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load authentication middleware
const requireAuth = passport.authenticate('jwt', { session: false });

// Load Log controller
const logController = require('../api/log/logController');

/**
 * @api { get } /api/logs/:id Get Log list
 * @apiGroup Logs
 * @apiSuccess { Object } logs Log list
 * @apiSuccess { Date } log.start Log's start date
 * @apiSuccess { Date } log.end Log's end date
 * @apiSuccess { ObjectId } log.user User's ID
 * @apiSuccess { ObjectId } log.ticket Ticket's ID
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      start: '2018-01-01T08:00:00.778Z',
 *      end: '2018-01-01T09:00:00.778Z',
 *      user: '5abfcd6d66ea260656e78487',
 *      ticket: '5aeef51bd8a97b07705002d5'
 *    }]
 * @apiErrorExample {json} Log Error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/', requireAuth, logController.all);

/**
 * @api { get } /api/logs/:id Get Log by ID
 * @apiGroup Logs
 * @apiParams {id} id Log ID
 * @apiSuccess { Date } start Log's start date
 * @apiSuccess { Date } end Log's end date
 * @apiSuccess { ObjectId } user User's ID
 * @apiSuccess { ObjectId } ticket Ticket's ID
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      start: '2018-01-01T08:00:00.778Z',
 *      end: '2018-01-01T09:00:00.778Z',
 *      user: '5abfcd6d66ea260656e78487',
 *      ticket: '5aeef51bd8a97b07705002d5'
 *    }
 * @apiErrorExample {json} Log Not Found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Log Error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/:id', requireAuth, logController.findById);

/**
 * @api { get } /api/logs/user/:id Get Logs by User ID
 * @apiGroup Logs
 * @apiParams {id} id User ID
 * @apiSuccess { Object[] } logs User logs
 * @apiSuccess { Date } log.start Log's start date
 * @apiSuccess { Date } log.end Log's end date
 * @apiSuccess { ObjectId } log.user User's ID
 * @apiSuccess { ObjectId } log.ticket Ticket's ID
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      start: '2018-01-01T08:00:00.778Z',
 *      end: '2018-01-01T09:00:00.778Z',
 *      user: '5abfcd6d66ea260656e78487',
 *      ticket: '5aeef51bd8a97b07705002d5'
 *    }]
 * @apiErrorExample {json} Log Not Found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Log Error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/user/:id', requireAuth, logController.findByUser);

/**
 * @api { get } /api/logs/ticket/:id Get Logs by Ticket ID
 * @apiGroup Logs
 * @apiParams {id} id Ticket ID
 * @apiSuccess { Object[] } logs Ticket logs
 * @apiSuccess { Date } log.start Log's start date
 * @apiSuccess { Date } log.end Log's end date
 * @apiSuccess { ObjectId } log.user User's ID
 * @apiSuccess { ObjectId } log.ticket Ticket's ID
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      start: '2018-01-01T08:00:00.778Z',
 *      end: '2018-01-01T09:00:00.778Z',
 *      user: '5abfcd6d66ea260656e78487',
 *      ticket: '5aeef51bd8a97b07705002d5'
 *    }]
 * @apiErrorExample {json} Log Not Found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Log Error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/ticket/:id', requireAuth, logController.findByTicket);

/**
 * @api { post } /api/logs Create new Log
 * @apiGroup Logs
 * @apiSuccess { Date } start Log's start date
 * @apiSuccess { Date } end Log's end date
 * @apiSuccess { ObjectId } user User's ID
 * @apiSuccess { ObjectId } ticket Ticket's ID
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      start: '2018-01-01T08:00:00.778Z',
 *      end: '2018-01-01T09:00:00.778Z',
 *      user: '5abfcd6d66ea260656e78487',
 *      ticket: '5aeef51bd8a97b07705002d5'
 *    }
 * @apiErrorExample {json} Log Already Exists
 *    HTTP/1.1 409 Conflict
 * @apiErrorExample {json} Log Error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/', requireAuth, logController.create);

/**
 * @api { put } /api/logs/:id Update Log by ID
 * @apiGroup Logs
 * @apiParams {id} id Log ID
 * @apiSuccess { Date } start Log's start date
 * @apiSuccess { Date } end Log's end date
 * @apiSuccess { ObjectId } user User's ID
 * @apiSuccess { ObjectId } ticket Ticket's ID
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      start: '2018-01-01T08:00:00.778Z',
 *      end: '2018-01-01T09:00:00.778Z',
 *      user: '5abfcd6d66ea260656e78487',
 *      ticket: '5aeef51bd8a97b07705002d5'
 *    }
 * @apiErrorExample {json} Log Not Found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Log Error
 *    HTTP/1.1 500 Internal Server Error
 */
router.put('/:id', requireAuth, logController.update);

/**
 * @api { put } /api/logs/ticket/:id Update Log by Ticket ID
 * @apiGroup Logs
 * @apiParams {id} id Ticket ID
 * @apiSuccess { Date } start Log's start date
 * @apiSuccess { Date } end Log's end date
 * @apiSuccess { ObjectId } user User's ID
 * @apiSuccess { ObjectId } ticket Ticket's ID
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      start: '2018-01-01T08:00:00.778Z',
 *      end: '2018-01-01T09:00:00.778Z',
 *      user: '5abfcd6d66ea260656e78487',
 *      ticket: '5aeef51bd8a97b07705002d5'
 *    }
 * @apiErrorExample {json} Log Not Found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Log Error
 *    HTTP/1.1 500 Internal Server Error
 */
router.put('/ticket/:id', requireAuth, logController.updateByTicket);

/**
 * @api { delete } /api/logs/:id Delete Log by ID
 * @apiGroup Logs
 * @apiParams {id} id Log ID
 * @apiSuccess { Date } start Log's start date
 * @apiSuccess { Date } end Log's end date
 * @apiSuccess { ObjectId } user User's ID
 * @apiSuccess { ObjectId } ticket Ticket's ID
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      start: '2018-01-01T08:00:00.778Z',
 *      end: '2018-01-01T09:00:00.778Z',
 *      user: '5abfcd6d66ea260656e78487',
 *      ticket: '5aeef51bd8a97b07705002d5'
 *    }
 * @apiErrorExample {json} Log Not Found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Log Error
 *    HTTP/1.1 500 Internal Server Error
 */
router.delete('/:id', requireAuth, logController.delete);

module.exports = router;