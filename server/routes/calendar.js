// Load modules
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load authentication middleware
const requireAuth = passport.authenticate('jwt', { session: false });

// Load calendar controller
const calendarController = require('../api/calendar/calendarController');

/**
 * @api { get } /api/calendar Get Calendar list
 * @apiGroup Calendar
 * @apiSuccess { Object[] } calendars Calendar list
 * @apiSuccess { Number } calendar.year Calendar's year
 * @apiSuccess { Object[] } calendar.days Days of the year
 * @apiSuccess { Number } calendar.days[].number Calendar day's number
 * @apiSuccess { Boolean } calendar.days[].isWorkday Is workday?
 * @apiSuccess { String } calendar.days[].note Note
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      year: 2018,
 *      days: [
 *        {
 *          number: 1,
 *          isWorkday: false,
 *          note: 'New Year'
 *        },
 *        ...
 *      ]
 *    }]
 * @apiErrorExample {json} Calendar Error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/', requireAuth, calendarController.all);

/**
 * @api { get } /api/calendar/year/:year Get Calendar by year
 * @apiGroup Calendar
 * @apiParam {year} year Calendar year
 * @apiSuccess { Number } year Calendar's year
 * @apiSuccess { Object[] } days Days of the year
 * @apiSuccess { Number } days[].number Calendar day's number
 * @apiSuccess { Boolean } days[].isWorkday Is workday?
 * @apiSuccess { String } days[].note Note
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      year: 2018,
 *      days: [
 *        {
 *          number: 1,
 *          isWorkday: false,
 *          note: 'New Year'
 *        },
 *        ...
 *      ]
 *    }
 * @apiErrorExample {json} Calendar Not Found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/year/:year', requireAuth, calendarController.getByYear);

/**
 * @api { get } /api/calendar/:id Get Calendar by ID
 * @apiGroup Calendar
 * @apiParam {id} id Calendar ID
 * @apiSuccess { Number } year Calendar's year
 * @apiSuccess { Object[] } days Days of the year
 * @apiSuccess { Number } days[].number Calendar day's number
 * @apiSuccess { Boolean } days[].isWorkday Is workday?
 * @apiSuccess { String } days[].note Note
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      year: 2018,
 *      days: [
 *        {
 *          number: 1,
 *          isWorkday: false,
 *          note: 'New Year'
 *        },
 *        ...
 *      ]
 *    }
 * @apiErrorExample {json} Calendar Not Found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get ('/:id', requireAuth, calendarController.getById);

/**
 * @api { post } /api/calendar/ Create new calendar
 * @apiGroup Calendar
 * @apiSuccess { Number } year Calendar's year
 * @apiSuccess { Object[] } days Days of the year
 * @apiSuccess { Number } days[].number Calendar day's number
 * @apiSuccess { Boolean } days[].isWorkday Is workday?
 * @apiSuccess { String } days[].note Note
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      year: 2018,
 *      days: [
 *        {
 *          number: 1,
 *          isWorkday: false,
 *          note: 'New Year'
 *        },
 *        ...
 *      ]
 *    }
 * @apiErrorExample {json} Calendar Already Exists
 *    HTTP/1.1 409 Conflict
 * @apiErrorExample {json} Calendar Error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/', requireAuth, calendarController.create);

/**
 * @api { put } /api/calendar/:id Update Calendar by ID
 * @apiGroup Calendar
 * @apiParam {id} id Calendar ID
 * @apiSuccess { Number } year Calendar's year
 * @apiSuccess { Object[] } days Days of the year
 * @apiSuccess { Number } days[].number Calendar day's number
 * @apiSuccess { Boolean } days[].isWorkday Is workday?
 * @apiSuccess { String } days[].note Note
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      year: 2018,
 *      days: [
 *        {
 *          number: 1,
 *          isWorkday: false,
 *          note: 'New Year'
 *        },
 *        ...
 *      ]
 *    }
 * @apiErrorExample {json} Calendar Not Found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Calendar Error
 *    HTTP/1.1 500 Internal Server Error
 */
router.put('/:id', requireAuth, calendarController.update);

/**
 * @api { delete } /api/calendar/:id Delete Calendar by ID
 * @apiGroup Calendar
 * @apiParam {id} id Calendar ID
 * @apiSuccess { Number } year Calendar's year
 * @apiSuccess { Object[] } days Days of the year
 * @apiSuccess { Number } days[].number Calendar day's number
 * @apiSuccess { Boolean } days[].isWorkday Is workday?
 * @apiSuccess { String } days[].note Note
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      year: 2018,
 *      days: [
 *        {
 *          number: 1,
 *          isWorkday: false,
 *          note: 'New Year'
 *        },
 *        ...
 *      ]
 *    }
 * @apiErrorExample {json} Calendar Not Found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Calendar Error
 *    HTTP/1.1 500 Internal Server Error
 */
router.delete('/:id', requireAuth, calendarController.delete);

module.exports = router;