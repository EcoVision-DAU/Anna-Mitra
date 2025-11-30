
const mongoos = require('mongoose');
const User = require('../models/user.model');
const VolunteerProfile = require('../models/volunteerprofile.model');
const NGOProfile = require('../models/ngoprofile.model');
const { volunteerProfileSchema } = require('../utils/joiSchemas');
const safeRender = require('../utils/safeRender');
const catchAsync = require('../utils/catchAsync');


// Create Volunteer Profile
module.exports.createVolunteerProfile = async (userId, volunteerProfile) => {
    volunteerProfile.userId = userId;
    const newVolunteerProfile = new VolunteerProfile(volunteerProfile);
    const createdVolunteerProfile = await newVolunteerProfile.save();
    return createdVolunteerProfile;
}

// Render Dashboard Page
module.exports.renderDashboardPage = catchAsync(async (req, res, next) => {
    safeRender(res, 'volunteer/dashboard', {
        activePage: 'volunteer-dashboard',
        pageTitle: 'Volunteer Dashboard | AnnaMitra',
        messageType: null,
        message: null
    }, next);
})

// Render Assigned Tasks Page
module.exports.renderAssignedTasksPage = catchAsync(async (req, res, next) => {
    safeRender(res, 'volunteer/assigned-tasks', {
        activePage: 'volunteer-assigned-tasks',
        pageTitle: 'Assigned tasks | AnnaMitra',
        messageType: null,
        message: null
    }, next);
})

// Render Donation History Page
module.exports.renderDonationHistoryPage = catchAsync(async (req, res, next) => {
    safeRender(res, 'volunteer/donation-history', {
        activePage: 'volunteer-donation-history',
        pageTitle: 'Donation history | AnnaMitra',
        messageType: null,
        message: null
    }, next);
})

// Render Notifications Page
module.exports.renderNotificationsPage = catchAsync(async (req, res, next) => {
    safeRender(res, 'volunteer/notifications', {
        activePage: 'volunteer-notifications',
        pageTitle: 'Notifications | AnnaMitra',
        messageType: null,
        message: null
    }, next);
})

// Render NGOs Page
module.exports.renderNgosPage = catchAsync(async (req, res, next) => {
    if(!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized access' });
    }
    const volunteerId = req.user._id;
    // Find NGOs where the volunteer is part of the volunteers array
    const NGOs = await NGOProfile.find({ volunteers: { $ne: volunteerId } });

    safeRender(res, 'volunteer/ngos', {
        activePage: 'volunteer-ngos',
        pageTitle: 'Available NGOs | AnnaMitra',
        messageType: null,
        message: null,
        NGOs: NGOs
    }, next);
})

// Render Joined NGOs Page
module.exports.renderJoinedNgosPage = catchAsync(async (req, res, next) => {
    if(!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized access' });
    }
    const volunteerId = req.user._id;
    // Find NGOs where the volunteer is part of the volunteers array
    const joinedNGOs = await NGOProfile.find({ volunteers: volunteerId });

    safeRender(res, 'volunteer/joined-ngos', {
        activePage: 'volunteer-joined-ngos',
        pageTitle: 'My NGOs | AnnaMitra',
        messageType: null,
        message: null,
        joinedNGOs: joinedNGOs
    }, next);
})

// Render Manage Account Page
module.exports.renderManageAccountPage = catchAsync(async (req, res, next) => {
    safeRender(res, 'volunteer/account', {
        activePage: 'volunteer-account',
        pageTitle: 'Manage account | AnnaMitra',
        messageType: null,
        message: null
    }, next);
})

// Render Volunteer Profile Page
module.exports.renderVolunteerProfilePage = catchAsync(async (req, res, next) => {
    const { id } = req.params;
});

