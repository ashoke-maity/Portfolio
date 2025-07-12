const dotenv = require('dotenv').config();
const sdk = require("node-appwrite");

// Initialize Appwrite client
const client = new sdk.Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT) // or your self-hosted URL
    .setProject(process.env.APPWRITE_PROJECT_ID) // Set your Project ID
    .setKey(process.env.APPWRITE_API_KEY); // Set your API Key (server-side)

const storage = new sdk.Storage(client);

// Export storage for use in other modules
module.exports = {
    client,
    storage
};
