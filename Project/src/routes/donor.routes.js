const express = require('express');
const donorController = require('../controllers/donor.controller');

const router = express.Router();

// Donor panel routes
router.get('/', donorController.getDashboard);
router.get('/ngos', donorController.getNgos);
router.get('/donations', donorController.getDonations);
router.get('/notifications', donorController.getNotifications);
router.get('/account', donorController.getAccount);

module.exports = router;
