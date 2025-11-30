const fs = require('fs');
const Donation = require('../models/donation.model');
// ** ADD CLOUDINARY IMPORT **
const { cloudinary } = require('../config/cloudinary'); 


// Helper 1: Deletes files from Cloudinary 
// NOTE: The previous deleteFiles logic was deleting local files. This function is for Cloudinary cleanup.
// For Vercel hosting, we will simply log a warning that local file deletion is skipped.
const deleteFiles = (imagePaths = []) => {
    // Since images are now stored on Cloudinary, deleting them requires
    // calling the Cloudinary API. This is the **correct future implementation**.
    // To ensure the app doesn't crash on Vercel when trying to delete old local files:

    imagePaths.forEach(image => {
        // If the path contains 'http' or 'res.cloudinary.com', it's a cloud path.
        if (image && image.includes('res.cloudinary.com')) {
            // **Future implementation:** Extract public ID and delete via API.
            // This is a placeholder as deleting is not required for the immediate fix.
            console.warn(`[Cloudinary] Deletion for image: ${image} is required.`);
        } else {
            // This handles old local paths that should be ignored on Vercel
            console.warn(`[Vercel Fix] Skipping local file deletion: ${image}. Requires cloud deletion.`);
        }
    });
};


// Helper 2: Constructing the food items map
const constructFoodItemsMap = (foodItems, oldImages) => {
    let foodItemsMap = [];
    for (let itemIndex in foodItems) {
        tempItem = foodItems[itemIndex];
        if (!tempItem.name && !tempItem.quantity && !tempItem.unit && !tempItem.type && !tempItem.condition && !tempItem.cookedDate && !tempItem.cookedTime) {
            continue;
        }
        if (tempItem.expiryDate === 'null' || tempItem.expiryDate === '') {
            tempItem.expiryDate = null;
        }
        if (tempItem.expiryTime === 'null' || tempItem.expiryTime === '') {
            tempItem.expiryTime = null;
        }

        if (tempItem.oldItemImages) {
            oldImages.push(...tempItem.oldItemImages);
            // console.log('Old item images to delete: ', tempItem.oldItemImages);
            delete tempItem.oldItemImages;
        }

        tempItem.quantity = parseInt(tempItem.quantity);
        const item = { ...tempItem };
        foodItemsMap.push(item);
    }
    return foodItemsMap;
}

// Helper 3: Extract image paths
const extractImagePaths = (files, donationImages, foodItemsMap) => {
    files.forEach(file => {
        const { fieldname, path } = file;

        // ** CRITICAL CHANGE: Use file.path (Cloudinary URL) instead of the local path **
        const hostedPath = file.path; // Multer-Cloudinary sets path to the secure URL

        // Store donation images
        if (fieldname.startsWith('donation[images[]]')) {
            donationImages.push(hostedPath);
        }

        // Store food item images
        const match = fieldname.match(/^foodItems\[(\d+)]\[itemImages]\[(\d+)]$/);
        if (match) {
            const index = match[1];
            if (!foodItemsMap[index].itemImages) foodItemsMap[index].itemImages = [];
            foodItemsMap[index].itemImages.push(hostedPath);
        }
    });
};

// Helper 4: Construct donation data object
const constructDonationData = (body, files, donorId, res, donationId = null) => {
    console.log("Constructing donation data...");
    try {
        let donationImages = [];
        let foodItemsMap = [];
        let oldImages = [];
        const donationData = { ...body.donation };

        // If updating and oldDonationImages found means new images uploaded, so mark old ones for deletion 
        if (donationData.oldDonationImages) {
            oldImages.push(...donationData.oldDonationImages);
            delete donationData.oldDonationImages;
        }
        // If updatingi and images found means no new images uploaded, so keep old ones in donationImages array
        if (donationData.images) {
            donationImages.push(...donationData.images);
        }

        // Construct food items array
        foodItemsMap = constructFoodItemsMap(body.foodItems, oldImages);

        // Handle file uploads / get image file paths
        extractImagePaths(files, donationImages, foodItemsMap);

        console.log('\nOld deletable images: ', oldImages);

        // clean up and construct final donation data object
        if (donationData.description === 'null' || donationData.description === '') {
            donationData.description = null;
        }
        donationData.donorId = donorId;
        donationData.items = foodItemsMap;
        donationData.images = donationImages;

        donationData.numberOfPeopleFed = parseInt(donationData.numberOfPeopleFed);
        const location = {
            latitude: parseFloat(donationData.latitude),
            longitude: parseFloat(donationData.longitude)
        }
        donationData.location = location;
        delete donationData.latitude;
        delete donationData.longitude;

        if (donationId) {
            return { donationData, oldImages };
        }
        return donationData;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    deleteFiles,
    constructDonationData
};