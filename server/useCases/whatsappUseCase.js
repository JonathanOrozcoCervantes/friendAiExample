const conversationService = require('../services/conversationService');
const llmService = require('../services/llmService');
const whatsappService = require('../services/whatsappService');
const { getMexicoCityDateTime } = require("../utils/general-utilities");
const { PHONE_NUMBER_ID_WHATSAPP_BUSINESS } = require('../config/settings');

class HandleWebhookVerificationUseCase {
    execute(query) {
        const mode = query['hub.mode'];
        const token = query['hub.verify_token'];
        const challenge = query['hub.challenge'];

        return whatsappService.verifyWebhookToken(mode, token, challenge);
    }
}

class ProcessWebhookMessageUseCase {
    async execute(data) {
        try {
            if (data.entry && data.entry.length > 0) {
                for (const entry of data.entry) {
                    const changes = entry.changes;
                    if (changes && changes.length > 0) {
                        for (const change of changes) {
                            if (change.field === 'messages') {
                                const messageList = change.value.messages;
                                const messagingProduct = change.value.messaging_product;

                                if (messageList && messageList.length > 0) {
                                    for (const messageData of messageList) {
                                        const from = messageData.from;
                                        const messageId = messageData.id;
                                        const messageText = messageData.text ? messageData.text.body : null;

                                        const tableDb = "messages_preprocessed";
                                        const mexicoCityDateTime = getMexicoCityDateTime();

                                        await conversationService.saveConversation(tableDb, {
                                            message_id: messageId,
                                            conversation_contact_method: messagingProduct,
                                            conversation_sender: from,
                                            conversation_message_content: messageText,
                                            conversation_message_timestamp: mexicoCityDateTime,
                                        });

                                        await conversationService.saveConversationToPinecone(
                                            messageId,
                                            messageText,
                                            messagingProduct,
                                            from,
                                            "user",
                                            messageText,
                                            mexicoCityDateTime
                                        );

                                        const context = await conversationService.getContextFromPinecone(from, messageText);
                                        const prompt = await llmService.createTextMessagePrompt(messageText, context);
                                        const llmResponse = await llmService.sendPrompt(prompt);

                                        await whatsappService.sendWhatsAppTextMessage(
                                            whatsappService.normalizeMexicanNumber(from),
                                            PHONE_NUMBER_ID_WHATSAPP_BUSINESS,
                                            llmResponse
                                        );
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.error("Error in ProcessWebhookMessageUseCase:", error);
            throw new Error(`Failed to process webhook message: ${error.message}`);
        }
    }
}

module.exports = { HandleWebhookVerificationUseCase, ProcessWebhookMessageUseCase };
