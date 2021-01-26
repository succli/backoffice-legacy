// Load modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Client Schema
const clientSchema = new Schema({
  company: { type: String, unique: true },
  email: String,
  phone: String,
  website: String,
  logo: String,
  contact: String
});

module.exports = mongoose.model('client', clientSchema);