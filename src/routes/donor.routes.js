const express = require('express');
const multer = require('multer');
const router = express.Router();
const donorController = require('../controllers/donor.controller');
const donorMiddleware = require('../middlewares/donor.middleware');
const { isLoggedIn, isDonor } = require('../middlewares/auth.middleware');

// ⭐ Use Cloudinary storage instead of disk storage
const { storage } = require('../config/cloudinary'); 
const upload = multer({ storage });

// All routes require the user to be logged in + be a donor
router.use(isLoggedIn, isDonor);

// Donor Dashboard
router.get('/', donorController.viewDonorDashboard);

// Update Donor Profile (profile image upload)
router.put(
    '/',
    upload.single('profileImage'),
    donorMiddleware.validateDonorProfileData,
    donorController.updateDonorProfile
);

// Donor Account Page
router.get('/account', donorController.renderDonorAccountPage);

// Toggle Notification Settings
router.post('/toggle-notifications', donorController.toggleDonorNotifications);

module.exports = router;
