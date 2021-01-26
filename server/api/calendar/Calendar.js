// Load modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Calendar Day Schema
const daySchema = {
  number: { type: Number, unique: true },
  isWorkday: { type: Boolean, default: false },
  note: { type: String, default: '' }
}

// Create Calendar Schema
const calendarSchema = new Schema({
  year: { type: Number, unique: true },
  days: [daySchema]
});

module.exports = mongoose.model('calendar', calendarSchema);