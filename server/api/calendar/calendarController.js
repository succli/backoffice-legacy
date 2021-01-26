// Load Calendar model
const Calendar = require('./Calendar');

module.exports = {

  /**
   * Get all Calendar entities from database and returns itas a JSON object
   * REST endpoint: GET /api/calendar
   * @param {Object} req Request object
   * @param {Object} res Result object
   */
  all: function (req, res) {
    Calendar.find()
      .select({ __v: 0 })
      .exec((error, calendar) => {
        if (error) {
          return res.status(500).json({ message: 'Error getting calendar data', error });
        }

        return res.status(200).json({ calendar })
      });
  },

  /**
   * Get a Calendar entity by ID from database and returns it as a JSON object
   * REST endpoint: GET /api/calendar/:id
   * @param {Object} req Request object
   * @param {Object} res Result object
   */
  getById: function (req, res) {
    Calendar.findById(req.params.id)
      .select({ __v: 0 })
      .exec((error, calendar) => {
        if (error) {
          return res.status(500).json({ message: 'Error getting calendar data', error });
        }

        if (!calendar) {
          return res.status(404).json({ message: 'Calendar not found' });
        }

        return res.status(200).json({ calendar });
      });
  },

  /**
   * Get a Calendar entity by year from database and returns it as a JSON object
   * REST endpoint: GET /api/calendar/year/:id
   * @param {Object} req Request object
   * @param {Object} res Result object
   */
  getByYear: function (req, res) {
    Calendar.findOne({ year: req.params.year })
      .select({ __v: 0 })
      .exec((error, calendar) => {
        if (error) {
          return res.status(500).json({ message: 'Error getting calendar data', error });
        }

        if (!calendar) {
          return res.status(404).json({ message: 'Calendar not found' });
        }

        return res.status(200).json({ calendar });
      })
  },

  /**
   * Creates new Calendar and returns it as a JSON object
   * REST endpoint: POST /api/calendar
   * @param {Object} req Request object
   * @param {Object} res Result object
   */
  create: function (req, res) {
    Calendar.findOne({ year: req.body.year }, (error, calendar) => {
      if (error) {
        return res.status(500).json({ message: 'Error getting calendar data', error });
      }

      if (calendar) {
        return res.status(409).json({ message: 'Calendar year exists' });
      }

      const newCalendar = new Calendar(req.body);
      newCalendar.save((error, calendar) => {
        if (error) {
          return res.status(500).json({ message: 'Error saving calendar data', error });
        }

        return res.status(200).json({ calendar })
      });
    });
  },

  /**
   * Updates Calendar and returns updated data as a JSON object
   * REST endpoint: PUT /api/calendar/:id
   * @param {Object} req Request object
   * @param {Object} res Result object
   */
  update: function (req, res) {
    Calendar.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true}, (error, calendar) => {
      if (error) {
        return res.status(500).json({ message: 'Error updating calendar data', error });
      }

      if (!calendar) {
        return res.status(404).json({ message: 'Calendar year not exists' });
      }

      return res.status(200).json({ calendar });
    });
  },

  /**
   * Deletes Calendar from database and returns the deleted data as a JSON object
   * REST endpoint: DELETE /api/calendar/:id
   * @param {Object} req Request object
   * @param {Object} res Result object
   */
  delete: function (req, res) {
    Calendar.findByIdAndRemove(req.params.id, (error, calendar) => {
      if (error) {
        return res.status(500).json({ message: 'Error deleting calendar data', error });
      }

      if (!calendar) {
        return res.status(404).json({ message: 'Calendar year not exists' });
      }

      return res.status(200).json({ calendar });
    });
  }
}