// Load modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Log Schema
const logSchema = new Schema({
  start: { type: Date, default: new Date() },
  end: Date,
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  ticket: { type: Schema.Types.ObjectId, ref: 'ticket', default: null }
});

module.exports = mongoose.model('log', logSchema);