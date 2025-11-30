const mongoose = require('mongoose');

const connectDB = async () => {
    // CRITICAL: Check if the URI is available before attempting to connect
    if (!process.env.MONGO_URI) {
        console.error("Mongo connection error: MONGO_URI is missing. Cannot connect to MongoDB.");
        // Do not proceed with connection, but RETURN gracefully (no crash)
        return; 
    }
    
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Mongo connection error: ${error.message}`);
        // CRITICAL FIX: The next line is REMOVED to stop the fatal Vercel crash.
        // process.exit(1); 
    }
};

module.exports = connectDB;