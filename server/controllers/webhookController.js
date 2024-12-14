// Use cases
const { HandleWebhookVerificationUseCase, ProcessWebhookMessageUseCase } = require('../useCases/whatsappUseCase');

exports.verifyWebhook = (req, res) => {
    try {
        const useCase = new HandleWebhookVerificationUseCase();
        const result = useCase.execute(req.query);
        res.status(result.status).send(result.data);
    } catch (error) {
        console.error("Error in verifyWebhook:", error);
        res.status(500).send({ message: "Error occurred during webhook verification", error: error.message });
    }
};

exports.processWebhook = async (req, res) => {
    try {
        const useCase = new ProcessWebhookMessageUseCase();
        await useCase.execute(req.body);
        res.status(200).json({ message: "Webhook processed successfully" });
    } catch (error) {
        console.error("Error in processWebhook:", error);
        res.status(500).json({ message: "Error processing webhook", error: error.message });
    }
};
