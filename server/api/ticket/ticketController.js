// Load Ticket model
const Ticket = require('./Ticket');

module.exports = {

  /**
   * Create new Ticket and returns it as a JSON object
   * REST endpoint: POST /api/tickets
   * @param {Object} req Request object
   * @param {Object} res Result object
   */
  create: function (req, res) {
    const newTicket = new Ticket(req.body);
    newTicket.save((error, ticket) => {
      if (error) {
        return res.status(500).json({ message: 'Error saving ticket.', error });
      }

      return res.status(200).json({ ticket });
    });
  },

  /**
   * Get Tickets from database and returns itas a JSON object
   * REST endpoint: GET /api/tickets
   * @param {Object} req Request object
   * @param {Object} res Result object
   */
  all: function (req, res) {
    Ticket.aggregate([
      {
        $lookup: {
          from: 'logs',
          localField: '_id',
          foreignField: 'ticket',
          as: 'logs'
        }
      },{
        $lookup: {
          from: 'clients',
          localField: 'client',
          foreignField: '_id',
          as: 'client'
        }
      }, { $unwind: '$client' }, { $sort: { priority: -1 } }, { $project: { __v: 0 } }
    ]).exec((error, tickets) => {
      if (error) {
        return res.status(500).json({ message: 'Error geting tickets.', error });
      }

      return res.status(200).json({ tickets });
    });
  },

  /**
   * Get Ticket by ID from database and returns it as a JSON object
   * REST endpoint: GET /api/tickets/:id
   * @param {Object} req Request object
   * @param {Object} res Result object
   */
  getById: function (req, res) {
    Ticket.findById(req.params.id)
      .select({ __v: 0 })
      .exec((error, ticket) => {
        if (error) {
          return res.status(500).json({ message: 'Error geting ticket.', error });
        }

        if (!ticket) {
          res.status(404).json({ message: 'Ticket not found.' });
        }

        return res.status(200).json({ ticket });
      });
  },

  /**
   * Get Tickets by Client ID from database and returns itas a JSON object
   * REST endpoint: GET /api/tickets/client/:id
   * @param {Object} req Request object
   * @param {Object} res Result object
   */
  getByClient: function (req, res) {
    Ticket.find({ client: req.params.id })
      .select({ __v: 0 })
      .exec((error, tickets) => {
        if (error) {
          return res.status(500).json({ message: 'Error geting client\'s tickets.', error });
        }

        return res.status(200).json({ tickets });
      });
  },

  /**
   * Get Tickets by User ID from database and returns itas a JSON object
   * REST endpoint: GET /api/tickets/user/:id
   * @param {Object} req Request object
   * @param {Object} res Result object
   */
  getByUser: function (req, res) {
    Ticket.find({ user: req.params.id })
      .select({ __v: 0 })
      .exec((error, tickets) => {
        if (error) {
          return res.status(500).json({ message: 'Error geting user\'s tickets.', error });
        }

        return res.status(200).json({ tickets });
      });
  },

  /**
   * Updates Ticket by ID and returns updated data as a JSON object
   * REST endpoint: PUT /api/tickets/:id
   * @param {Object} req Request object
   * @param {Object} res Result object
   */
  update: function (req, res) {
    Ticket.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true}, (error, ticket) => {
      if (error) {
        return res.status(500).json({ message: 'Error updating ticket.', error });
      }

      if (!ticket) {
        res.status(404).json({ message: 'Ticket not found.' });
      }

      return res.status(200).json({ ticket });
    });
  },

  /**
   * Deletes Ticket by ID and returns deleted data as a JSON object
   * REST endpoint: DELETE /api/tickets/:id
   * @param {Object} req Request object
   * @param {Object} res Result object
   */
  delete: function (req, res) {
    Ticket.findByIdAndRemove(req.params.id, (error, ticket) => {
      if (error) {
        return res.status(500).json({ message: 'Error deleting ticket.', error });
      }

      if (!ticket) {
        res.status(404).json({ message: 'Ticket not found.' });
      }

      return res.status(200).json({ ticket });
    });
  }
}