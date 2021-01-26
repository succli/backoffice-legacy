const express = require('express');
const router = express.Router();
const http = require('http');

// Import api subroutes
const authRoutes = require('./auth');
const userRoutes = require('./user');
const uploadRoutes = require('./upload');
const clientRoutes = require('./client');
const ticketRoutes = require('./ticket');
const logRoutes = require('./log');
const calendarRoutes = require('./calendar');

router.get('/', (req, res) => {
  res.send('api works');
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/upload', uploadRoutes);
router.use('/clients', clientRoutes);
router.use('/tickets', ticketRoutes);
router.use('/logs', logRoutes);
router.use('/calendar', calendarRoutes);

module.exports = router;