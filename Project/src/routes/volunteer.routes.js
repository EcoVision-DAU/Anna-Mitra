const express = require('express');
const volunteerController = require('../controllers/volunteer.controller');

const router = express.Router();

// TEMP DEBUG: confirm we really have functions
// (You can remove these logs once it works)
console.log('[volunteer.routes] controller type:', typeof volunteerController);
console.log('[volunteer.routes] controller keys:', Object.keys(volunteerController || {}));

// Dashboard
router.get('/', volunteerController.getDashboard);

// Lists
router.get('/assigned-tasks', volunteerController.getAssignedTasks);
router.get('/joined-ngos', volunteerController.getJoinedNgos);
router.get('/notifications', volunteerController.getNotifications);
router.get('/account', volunteerController.getAccount);

module.exports = router;
