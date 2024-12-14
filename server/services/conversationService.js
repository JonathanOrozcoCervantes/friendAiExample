// Configuration for Pinecone
const { pinecone, indexName } = require('../config/pineconeConfig');
// Repository for accessing conversation-related data
const conversationRepository = require('../repositories/conversationRepository');


class ConversationService {
    async saveConversation(tableDb, insertData) {
        try {
            return await conversationRepository.saveConversation(tableDb, insertData);
        } catch (error) {
            console.error("Error in saveConversation:", error);
            throw new Error(`Failed to save conversation Firestore: ${error.message}`);
        }
    }

    async saveConversationToPinecone(messageId, messageText, messagingProduct, from, sender, messageContent, mexicoCityDateTime) {
        try {
            const index = pinecone.Index(indexName);

            // Generate embedding of the message
            const embeddings = await pinecone.inference.embed(
                "multilingual-e5-large",
                [messageContent],
                { inputType: "passage" }
            );

            if (!embeddings || embeddings.length === 0) {
                throw new Error("No embeddings were generated for the message.");
            }

            const vector = [
                {
                    id: `${from}-${messageId}`,
                    values: embeddings[0].values,
                    metadata: {
                        message_id: messageId,
                        message_text: messageText,
                        messaging_product: messagingProduct,
                        from,
                        sender,
                        message_timestamp: mexicoCityDateTime,
                    },
                },
            ];

            await index.namespace(from).upsert(vector);
        } catch (error) {
            console.error("Error in saveConversationToPinecone:", error);
            throw new Error(`Failed to save conversation to Pinecone: ${error.message}`);
        }
    }

    async getContextFromPinecone(from, queryText) {
        try {
            const index = pinecone.Index(indexName);
    
            // Generates the embedding for the query text
            const queryEmbedding = await pinecone.inference.embed(
                "multilingual-e5-large",
                [queryText],
                { inputType: "passage" }
            );
    
            if (!queryEmbedding || queryEmbedding.length === 0) {
                throw new Error("No embeddings were generated for the query text.");
            }
    
            // Search for the closest vectors
            const results = await index.namespace(from).query({
                topK: 10, // Number of desired results
                vector: queryEmbedding[0].values,
                includeMetadata: true, // Include metadata in the results
            });
    
            console.log(results.matches);
    
            if (results.matches && results.matches.length > 0) {
                // Extract only the message_text
                const messageTexts = results.matches.map(item => {
                    // Check if message_text exists directly or in metadata
                    return item.message_text || item.metadata?.message_text || null;
                }).filter(Boolean); // Filter out any null or undefined values
    
                return messageTexts; // Return the filtered array
            }
    
            return []; // Return an empty array if no matches
        } catch (error) {
            console.error("Error in getContextFromPinecone:", error);
            throw new Error(`Failed to retrieve context from Pinecone: ${error.message}`);
        }
    }
    
}

module.exports = new ConversationService();
