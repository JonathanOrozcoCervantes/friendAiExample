// Firebase Admin SDK
const admin = require('firebase-admin');

// Load Firebase configuration from credentials file
const serviceAccount = require('./serviceAccountKey.json');
const { PROJECT_ID_SERVICE_ACCOUNT,
    PRIVATE_KEY_ID_SERVICE_ACCOUNT,
    PRIVATE_KEY_SERVICE_ACCOUNT,
    CLIENT_EMAIL_SERVICE_ACCOUNT,
    CLIENT_ID_SERVICE_ACCOUNT,
    CLIENT_X509_CERT_URL_SERVICE_ACCOUNT } = require('./config/settings');

// Overwrites critical keys with environment settings
const credentialConfig = {
    ...serviceAccount,
    project_id: PROJECT_ID_SERVICE_ACCOUNT,
    private_key_id: PRIVATE_KEY_ID_SERVICE_ACCOUNT,
    private_key: PRIVATE_KEY_SERVICE_ACCOUNT.replace(/\\n/g, '\n'),
    client_email: CLIENT_EMAIL_SERVICE_ACCOUNT,
    client_id: CLIENT_ID_SERVICE_ACCOUNT,
    client_x509_cert_url: CLIENT_X509_CERT_URL_SERVICE_ACCOUNT
  };

admin.initializeApp({
  credential: admin.credential.cert(credentialConfig)
});

const db = admin.firestore();

module.exports = db;
