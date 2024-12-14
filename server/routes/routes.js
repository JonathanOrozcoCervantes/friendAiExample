// Express framework for creating routes
const express = require('express');
// Routes for handling webhooks
const webhookRoutes = require('./webhookRoutes');

// Router instance
const router = express.Router();

router.use('/webhook', webhookRoutes);

module.exports = router;
