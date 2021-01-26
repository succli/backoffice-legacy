// Load Client model
const Client = require('./Client');

module.exports = {

  /**
   * Get all Clients from database and returns itas a JSON object
   * REST endpoint: GET /api/clients
   * @param {Object} req Request object
   * @param {Object} res Result object
   */
  all: function (req, res) {
    Client.find()
      .select({ __v: 0 })
      .exec((error, clients) => {
        if (error) {
          return res.status(500).json({ message: 'Error getting clients', error });
        }

        return res.status(200).json({ clients });
      });
  },

  /**
   * Get Client by ID from database and returns it as a JSON object
   * REST endpoint: GET /api/clients/:id
   * @param {Object} req Request object
   * @param {Object} res Result object
   */
  getById: function (req, res) {
    Client.findById(req.params.id)
      .select({ __v: 0 })
      .exec((error, client) => {
        if (error) {
          return res.status(500).json({ message: 'Error getting client', error });
        }

        if (!client) {
          return res.status(404).json({ message: 'Client not found' });
        }

        return res.status(200).json({ client });
      });
  },

  /**
   * Creates new Client and returns it as a JSON object
   * REST endpoint: POST /api/clients
   * @param {Object} req Request object
   * @param {Object} res Result object
   */
  create: function (req, res) {
    Client.findOne({ company: req.body.company }, (error, client) => {
      if (error) {
        return res.status(500).json({ message: 'Error getting client', error });
      }

      if (client) {
        return res.status(409).json({ message: 'Client already exists.' })
      }

      const newClient = new Client(req.body)
      newClient.save((error, client) => {
        if (error) {
          return res.status(500).json({ message: 'Error saving client.', error });
        }

        return res.status(200).json({ client });
      });
    });
  },

  /**
   * Updates Client from database and returns updated data as a JSON object
   * REST endpoint: PUT /api/clients/:id
   * @param {Object} req Request object
   * @param {Object} res Result object
   */
  update: function (req, res) {
    Client.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true}, (error, client) => {
      if (error) {
        return res.status(500).json({ message: 'Error updating client.', error });
      }

      if (!client) {
        return res.status(404).json({ message: 'Client not exists.' });
      }

      return res.status(200).json({ client });
    });
  },

  /**
   * Deletes Client from database and returns deleted data as a JSON object
   * REST endpoint: DELETE /api/clients/:id
   * @param {Object} req Request object
   * @param {Object} res Result object
   */
  delete: function (req, res) {
    Client.findByIdAndRemove(req.params.id, (error, client) => {
      if (error) {
        return res.status(500).json({ message: 'Error deleting client.', error });
      }

      if (!client) {
        return res.status(404).json({ message: 'Client not exists.' });
      }

      return res.status(200).json({ client });
    });
  },

  /**
   * Unset Client's logo and updates it, then returns the updated data as a JSON object
   * REST endpoint: PUT /api/clients/:id/unsetLogo
   * @param {Object} req Request object
   * @param {Object} res Result object
   */
  unsetLogo: function (req, res) {
    Client.findByIdAndUpdate(req.params.id, { $unset: { logo: '' } }, {new: true})
      .select({ __v: 0 })  
      .exec((error, client) => {
        if (error) {
          return res.status(500).json({
            message: 'Error deleting client.',
            error
          });
        }

        if (!client) {
          return res.status(404).json({
            message: 'Client don\'t exists.'
          });
        }

        return res.status(200).json({
          message: 'Successfully deleted client logo',
          client
        });
      });
  }
}