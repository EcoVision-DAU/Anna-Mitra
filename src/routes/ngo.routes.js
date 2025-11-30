const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const ngoController = require('../controllers/ngo.controller');
const ngoMiddleware = require('../middlewares/ngo.middleware');
const { isLoggedIn, isNGO, isVolunteer } = require('../middlewares/auth.middleware');

// ⭐ Use Cloudinary storage instead of disk storage
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });

// All routes here require user to be logged in 
router.use(isLoggedIn);

// Dashboard Route
router.get('/', isNGO, ngoController.renderDashboardPage);

// Active Donations Route
router.get('/my-donations', isNGO, ngoController.renderMyDonationsPage);

// Staff Route
router.get('/staff', isNGO, ngoController.renderStaffPage);

// Joining Requests Route
router.get('/joining-requests', isNGO, ngoController.renderJoiningRequestsPage);

// Accept Volunteer Request Route
router.post('/requests/:requestId/accept', isNGO, ngoController.acceptVolunteerRequest);

// Reject Volunteer Request Route
router.post('/requests/:requestId/reject', isNGO, ngoController.rejectVolunteerRequest);

// Notifications Route
router.get('/notifications', isNGO, ngoController.renderNotificationsPage);

// Manage Account Route
router.get('/account', isNGO, ngoController.renderManageAccountPage);

// Update Account Details (Profile image, banner image, documents)
router.put(
    '/account',
    isNGO,
    upload.fields([
        { name: 'profileImage', maxCount: 1 },
        { name: 'bannerImage', maxCount: 1 },
        { name: 'documents', maxCount: 10 }
    ]),
    ngoMiddleware.constructProfileData,
    ngoMiddleware.validateProfileData,
    ngoController.handleUpdateAccount
);

// View NGO Profile
router.get('/:id', ngoController.renderNgoProfilePage);

// Handle Volunteer Join Request
router.post('/:id/request-join', isVolunteer, ngoController.handleVolunteerRequest);

// Remove volunteer from NGO
router.delete('/:id/volunteers/:volunteerId', isNGO, ngoController.removeVolunteerFromNGO);

module.exports = router;
