const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Add checks for Cloudinary variables
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.warn("Cloudinary configuration failed: One or more environment variables are missing. File uploads will not work.");
    
    // Export empty objects to allow the app to START without crashing.
    // Uploads will fail gracefully later.
    module.exports = {
        cloudinary: {},
        storage: {
            _handleFile: (req, file, cb) => cb(new Error("Cloudinary not configured.")),
            _removeFile: (req, file, cb) => cb(null) 
        }
    };
} else {
    // Only attempt configuration if all variables are present
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const storage = new CloudinaryStorage({
        cloudinary,
        params: {
            folder: 'AnnaMitra', 
            allowed_formats: ['jpeg', 'png', 'jpg', 'webp'],
        }
    });

    module.exports = {
        cloudinary,
        storage
    };
}