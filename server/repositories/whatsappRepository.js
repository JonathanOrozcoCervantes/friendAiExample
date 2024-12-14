// HTTP client for making API requests
const axios = require('axios');
// Configuration settings
const { ACCESS_TOKEN_WHATSAPP_BUSINESS } = require('../config/settings');


class WhatsAppRepository {
    async sendTextMessage(recipientNumber, phoneNumberId, messageText) {
        const url = `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`;

        const data = {
            messaging_product: 'whatsapp',
            to: recipientNumber,
            type: 'text',
            text: {
                body: messageText,
            },
        };

        try {
            const response = await axios.post(url, data, {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN_WHATSAPP_BUSINESS}`,
                    'Content-Type': 'application/json',
                },
            });

            return response.data;
        } catch (error) {
            console.error("Error in sendTextMessage (repository):", error);
            throw new Error(`sendTextMessage failed: ${error.message}`);
        }
    }
}

module.exports = new WhatsAppRepository();
