// External dependencies
const { Pinecone } = require('@pinecone-database/pinecone');
// Internal dependencies
const { API_KEY_PINECONE_PROD } = require('./settings');


const pinecone = new Pinecone({
  apiKey: API_KEY_PINECONE_PROD
});

const indexName = 'conversations';
const dimensions = 1024;

module.exports = { pinecone, indexName, dimensions };
