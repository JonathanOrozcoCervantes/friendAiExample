const whatsappRepository = require('../repositories/whatsappRepository');
const { ACCESS_TOKEN_WEBHOOK_WHATSAPP_BUSINESS } = require('../config/settings');

class WhatsAppService {
    verifyWebhookToken(mode, token, challenge) {
        if (mode && token === ACCESS_TOKEN_WEBHOOK_WHATSAPP_BUSINESS) {
            console.log('Webhook verification successful');
            return { status: 200, data: challenge };
        } else {
            console.log('Webhook verification failed');
            return { status: 403, data: { message: "Invalid token or mode" } };
        }
    }

    normalizeMexicanNumber(phone) {
        const regex = /^52(1)?(\d{10})$/;
        const match = phone.match(regex);
        if (!match) {
            throw new Error("Invalid Mexican phone number format");
        }
        return `52${match[2]}`;
    }

    async sendWhatsAppTextMessage(recipientNumber, phoneNumberId, messageText) {
        return await whatsappRepository.sendTextMessage(recipientNumber, phoneNumberId, messageText);
    }
}

module.exports = new WhatsAppService();
