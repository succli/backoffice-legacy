// Load modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Ticket Schema
const ticketSchema = new Schema({
  name: String,
  startdate: { type: Date, default: new Date() },
  duedate: Date,
  priority: { type: Number, enum: [0, 1, 2, 3], default: 1 },
  description: String,
  type: { type: String, enum: ['development', 'design', 'management', 'default'], default: 'default' },
  estimated: Number,
  hyperlink: String,
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  client: { type: Schema.Types.ObjectId, ref: 'client' },
  closed: { type: Boolean, default: false }
});

module.exports = mongoose.model('ticket', ticketSchema);