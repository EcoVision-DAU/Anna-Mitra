 // This file acts as the serverless function entry point for Vercel.
// It imports the Express app instance from your main index.js.
const app = require('../index'); 

// Vercel only needs the exported app instance to handle requests.
module.exports = app;