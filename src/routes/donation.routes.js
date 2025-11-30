const express = require('express');
const multer = require('multer');
const router = express.Router();

// 1. **IMPORT CLOUDINARY STORAGE (NEW)**
const { storage } = require('../config/cloudinary'); 
const upload = multer({ storage });

const donationController = require('../controllers/donation.controller');
const donationMiddleware = require('../middlewares/donation.middleware');
const { isLoggedIn, isDonor, isNGO } = require('../middlewares/auth.middleware');

// OLD: The previous local disk storage setup is now gone.

// All routes here require user to be logged in
router.use(isLoggedIn);

router.get('/', donationController.listDonations);

router.get('/new', isDonor, donationController.renderDonationForm);

router.get('/:id', donationController.viewDonationDetails);

router.post('/:id/requests', isNGO, donationController.handleDonationRequest);

router.post('/:id/cancel-pickup', donationController.cancelDonationPickup);

router.post('/:id/schedule-pickup', isNGO, donationController.schedulePickup);

// NOTE: upload.any() is kept but now uses Cloudinary storage
router.post('/:id/mark-completed', upload.any(), donationController.markDonationCompleted);

// OTP routes
router.post('/:id/send-otp', donationController.sendOTP);
router.post('/:id/verify-otp', donationController.verifyOTP);

// Only donors can create, edit, or delete donations
router.use(isDonor);

// NOTE: upload.any() is kept but now uses Cloudinary storage
router.post('/', upload.any(), donationMiddleware.validateDonationData, donationController.submitDonationForm);

router.get('/:id/edit', donationController.renderEditDonationForm);

// NOTE: upload.any() is kept but now uses Cloudinary storage
router.put('/:id/', upload.any(), donationMiddleware.validateDonationData, donationController.submitEditDonationForm);

router.delete('/:id', donationController.deleteDonation);

router.post('/:id/requests/:requestId/approve', donationController.approveRequest);

router.post('/:id/requests/:requestId/reject', donationController.rejectRequest);

module.exports = router;