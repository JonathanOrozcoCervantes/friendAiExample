// OpenAI client library
const OpenAI = require('openai');
// Configuration settings
const { API_KEY_OPENAI_PROD } = require('../config/settings');
// OpenAI configuration
const openai = new OpenAI({ apiKey: API_KEY_OPENAI_PROD });


class LlmRepository {
    async sendPromptToLlm(prompt) {
        try {
            // Request to LLM
            const response = await openai.chat.completions.create(prompt);
            return response.choices[0].message.content;
        } catch (error) {
            console.error("Error in sendPromptToLlm function:", error);
            throw new Error(`sendPromptToLlm failed: ${error.message}`);
        }
    }
}

module.exports = new LlmRepository();
