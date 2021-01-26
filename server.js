// Load modules
const express = require('express');
const session = require('express-session');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const morgan = require('morgan');

// Establish database connection
mongoose.connect(process.env.DATABASE, { useMongoClient: true });

// Get API routes
const api = require('./server/routes/api');

// Init application via Express.js
const app = express();

// Pasers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: process.env.SECRET, resave: true, saveUninitialized: true }));
app.use(flash());
app.use(morgan('dev'));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Point static path to public
app.use(express.static(path.join(__dirname, 'public')))

// Headers
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Set API routes
app.use('/api', api);

// Get React frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'app/index.html'));
});

// Get port from environment and store in Express
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server
const server = http.createServer(app);

// Listen on provided port, on all network interfaces
server.listen(port, () => console.log(`APP running on localhost:${port}`));
