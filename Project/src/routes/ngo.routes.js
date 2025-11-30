const express = require('express');
const router = express.Router();
const ngoController = require('../controllers/ngo.controller');
const { isLoggedIn, isNGO } = require('../middlewares/auth.middleware');

// All routes here require user to be logged in 
router.use(isLoggedIn);

// View Ngo Profile Route
router.get('/:id', ngoController.renderNgoProfilePage);

// All routes here require user to be an NGO
router.use(isNGO);

// Dashboard Route
router.get('/', ngoController.renderDashboardPage);

// Active Donations Route
router.get('/my-donations', ngoController.renderMyDonationsPage);

// Staff Route
router.get('/staff', ngoController.renderStaffPage);

// Joining Requests Route
router.get('/joining-requests', ngoController.renderJoiningRequestsPage);

// Notifications Route
router.get('/notifications', ngoController.renderNotificationsPage);

// Manage Account Route
router.get('/account', ngoController.renderNgoProfilePage);


module.exports = router;