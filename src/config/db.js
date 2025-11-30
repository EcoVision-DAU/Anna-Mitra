const mongoose = require('mongoose');

const connectDB = async () => {
    // 1. Check if MONGO_URI is available before trying to connect
    if (!process.env.MONGO_URI) {
        console.error("CRITICAL ERROR: MONGO_URI is undefined. Check Vercel Environment Variables.");
        // DO NOT process.exit(1)
        return; // Exit function gracefully
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        // 2. Log the error but do not exit the process, to prevent Vercel crash
        console.error(`Mongo connection error: ${error.message}`);
        // process.exit(1); <--- REMOVE THIS LINE
    }
};

module.exports = connectDB;