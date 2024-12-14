// Repository for accessing LLM-related data
const llmRepository = require('../repositories/llmRepository');
// Configuration for base prompts
const {
    BASE_PROMPT_FRIENDLY_SYSTEM,
    BASE_PROMPT_FRIENDLY_CONVERSATION
} = require("../config/prompts");


const BASE_REQUEST_LLM = {
    model: "gpt-3.5-turbo",
    messages: [
        { role: "system", content: "" },
        { role: "user", content: "" }
    ],
    temperature: 0.2,
    max_tokens: 300,
    top_p: 0.9
};

class LlmService {
    async sendPrompt(prompt) {
        return await llmRepository.sendPromptToLlm(prompt);
    }

    async createTextMessagePrompt(userQuestion, conversationContext) {
        try {
            // Convert conversationContext to a string
            const conversationHistory = conversationContext
            .filter(message => message?.trim()) // Filter out empty or whitespace-only messages
            .map((message, index) => `Message ${index + 1}: ${message}`) // Format each message with an index
            .join('\n'); // Join all messages with a newline character

            console.log("conversationHistory: ", conversationHistory)

            const contentUser = `
                Context:
                    conversation_history: ${conversationHistory}
                Task: ${BASE_PROMPT_FRIENDLY_CONVERSATION}
                User question: ${userQuestion}
            `;

            // Modify the content of the BASE_REQUEST_LLM object with the updated variables
            BASE_REQUEST_LLM.messages[0].content = BASE_PROMPT_FRIENDLY_SYSTEM;
            BASE_REQUEST_LLM.messages[1].content = contentUser;

            return BASE_REQUEST_LLM;
        } catch (error) {
            console.error("Error in createTextMessagePrompt function:", error);
            throw new Error(`createTextMessagePrompt failed: ${error.message}`);
        }
    }
}

module.exports = new LlmService();
