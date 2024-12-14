// Express framework for creating routes
const express = require('express');
// Controller methods for handling webhook verification and processing
const { verifyWebhook, processWebhook } = require('../controllers/webhookController');

// Router instance
const router = express.Router();


router.get('/whatsapp-business', verifyWebhook);
router.post('/whatsapp-business', processWebhook);

module.exports = router;
