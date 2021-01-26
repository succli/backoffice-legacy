// Load modules
const express = require('express');
const router = express.Router();
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const passport = require('passport');

// Load authentication middleware
const requireAuth = passport.authenticate('jwt', { session: false });

// Load upload controller
const uploadController = require('../api/upload/uploadController');

/**
 * @api {post} /api/upload/ Upload file
 * @apiGroup Upload
 * @apiParam {Object[]} files Files Object
 * @apiParamExample {json} Input
 *    {
 *       files: []
 *    }
 * @apiSuccess {String} message Upload message
 * @apiSuccess {String} result Uploaded file url
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      message: 'Successfully uploaded file.',
 *      result: 'http://example.com/path/to/image.png'
 *    }
 * @apiErrorExample {json} Upload Error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/', requireAuth, multipartMiddleware, uploadController.upload);

/**
 * @api {post} /api/upload/delete Upload file
 * @apiGroup Upload
 * @apiParam {String} url File url
 * @apiParamExample {json} Input
 *    {
 *       url: 'http://example.com/path/to/image.png'
 *    }
 * @apiSuccess {String} message Upload message
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      message: 'Successfully deleted file.'
 *    }
 * @apiErrorExample {json} Upload Error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/delete', requireAuth, uploadController.delete);

module.exports = router;