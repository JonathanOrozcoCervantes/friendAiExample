// Database connection
const db = require('../firebaseAdmin');
// Utility for generating unique IDs
const uuid = require('uuid');


class ConversationRepository {
    async saveConversation(table, data) {
        await db.collection(table).add(data);
    }
}

module.exports = new ConversationRepository();
