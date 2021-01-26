// Load Log model
const Log = require('./Log');

module.exports = {

  /**
   * Get Logs from database and returns it as a JSON object
   * REST endpoint: GET /api/logs
   * @param {Object} req Request object
   * @param {Object} res Result object
   */
  all: function (req, res) {
    Log.find()
      .populate('ticket')
      .exec((error, logs) => {
        if (error) {
          return res.status(500).json({ message: 'Error geting logs.', error });
        }

        return res.status(200).json({ logs });
      });
  },

  /**
   * Creates new Log and returns it as a JSON object
   * REST endpoint: POST /api/logs
   * @param {Object} req Request object
   * @param {Object} res Result object
   */
  create: function (req, res) {
    Log.findOne({ start: req.body.start, ticket: req.body.ticket }, (error, log) => {
      if (error) {
        return res.status(500).json({ message: 'Error saving log.', error });
      }

      if (log) {
        return res.status(409).json({ message: 'Log already exists.' })
      }

      const newLog = new Log(req.body);
      newLog.save((error, log) => {
        if (error) {
          return res.status(500).json({ message: 'Error saving log.', error });
        }

        return res.status(200).json({ log });
      });
    });
  },

  /**
   * Updates Log by ID and returns updated data as a JSON object
   * REST endpoint: PUT /api/logs/:id
   * @param {Object} req Request object
   * @param {Object} res Result object
   */
  update: function (req, res) {
    Log.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true}, (error, log) => {
      if (error) {
        return res.status(500).json({ message: 'Error updating log.', error });
      }

      if (!log) {
        return res.status(404).json({ message: 'Log not exists' });
      }

      return res.status(200).json({ log });
    });
  },

  /**
   * Updates Log by Ticket and returns updated data as a JSON object
   * REST endpoint: PUT /api/logs/ticket/:id
   * @param {Object} req Request object
   * @param {Object} res Result object
   */
  updateByTicket: function (req, res) {
    Log.findOneAndUpdate({ ticket: req.params.id }, { $set: req.body }, {new: true}, (error, log) => {
      if (error) {
        return res.status(500).json({ message: 'Error updating log.', error });
      }

      if (!log) {
        return res.status(404).json({ message: 'Log not exists' });
      }

      return res.status(200).json({ log });
    });
  },

  /**
   * Deletes Log by ID and returns deleted data as a JSON object
   * REST endpoint: DELETE /api/logs/:id
   * @param {Object} req Request object
   * @param {Object} res Result object
   */
  delete: function (req, res) {
    Log.findByIdAndRemove(req.params.id, (error, log) => {
      if (error) {
        return res.status(500).json({ message: 'Error deleting log.', error });
      }

      if (!log) {
        return res.status(404).json({ message: 'Log not exists' });
      }

      return res.status(200).json({ log });
    });
  },

  /**
   * Get Log by ID and returns it as a JSON object
   * REST endpoint: GET /api/logs/:id
   * @param {Object} req Request object
   * @param {Object} res Result object
   */
  findById: function (req, res) {
    Log.findById(req.params.id)
      .select({ __v: 0 })
      .exec((error, log) => {
        if (error) {
          return res.status(500).json({ message: 'Error finding log.', error });
        }

        if (!log) {
          return res.status(404).json({ message: 'Log not found' })
        }

        return res.status(200).json({ log });
      });
  },

  /**
   * Get Logs by User ID and returns itas a JSON object
   * REST endpoint: GET /api/logs/user/:id
   * @param {Object} req Request object
   * @param {Object} res Result object
   */
  findByUser: function (req, res) {
    Log.find({ user: req.params.id })
      .select({ __v: 0 })
      .exec((error, logs) => {
        if (error) {
          return res.status(500).json({ message: 'Error finding user\'s logs', error });
        }

        return res.status(200).json({ logs });
      });
  },

  /**
   * Get Logs by Ticket ID and returns itas a JSON object
   * REST endpoint: GET /api/logs/ticket/:id
   * @param {Object} req Request object
   * @param {Object} res Result object
   */
  findByTicket: function (req, res) {
    Log.find({ ticket: req.params.id })
      .select({ __v: 0 })
      .exec((error, logs) => {
        if (error) {
          return res.status(500).json({ message: 'Error finding ticket\'s logs', error });
        }

        return res.status(200).json({ logs });
      });
  }
}