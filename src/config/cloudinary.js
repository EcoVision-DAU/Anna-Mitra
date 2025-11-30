const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary using environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Define storage settings for Multer
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'AnnaMitra', // Main folder in Cloudinary
        allowed_formats: ['jpeg', 'png', 'jpg', 'webp'],
        // You might want a different folder based on upload type (e.g., 'AnnaMitra/donations')
        // This setting may need fine-tuning based on the Multer setup in donation.routes.js
    }
});

module.exports = {
    cloudinary,
    storage
};