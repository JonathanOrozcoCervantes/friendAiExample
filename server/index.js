// Imports from external libraries
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const webhookRoutes = require('./routes/webhookRoutes');

// Initialization of the application
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/webhook', webhookRoutes);

app.get('/ping', (req, res) => res.status(200).send("I'm alive..."));

// Configuration for local environment or deployment
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`API running locally on http://localhost:${PORT}`);
    });
} else {
    // Export for Firebase Functions
    exports.api = functions.https.onRequest(app);
}
