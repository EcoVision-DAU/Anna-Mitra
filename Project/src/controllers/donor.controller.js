const mongoose = require('mongoose');
const DonorProfile = require('../models/donorprofile.model');
const { donorProfileSchema } = require('../utils/joiSchemas');
const catchAsync = require('../utils/catchAsync');

/* ---------------------- Donor Profile (existing) ---------------------- */

// Create Donor Profile
module.exports.createDonorProfile = async (userId, donorProfile) => {
  donorProfile.userId = userId;
  const newDonorProfile = new DonorProfile(donorProfile);
  const createdDonorProfile = await newDonorProfile.save();
  return createdDonorProfile;
};

/* ---------------------- Donor Panel Views ---------------------- */

// Dashboard
module.exports.getDashboard = catchAsync(async (req, res) => {
  // Mock stats — replace with DB calls
  const stats = { totalCount: 5, impact: 120, thisMonth: 2 };
  const recent = [
    {
      date: '2025-10-01',
      ngoId: '123',
      ngoName: 'Helping Hands',
      type: 'Food',
      summary: '10 kg Rice',
      status: 'Completed'
    },
    {
      date: '2025-09-20',
      ngoId: '456',
      ngoName: 'Green Earth',
      type: 'Money',
      summary: '$200',
      status: 'Pending'
    }
  ];

  res.render('donor/dashboard', { donor: req.user, stats, recent });
});

// Find NGOs
module.exports.getNgos = catchAsync(async (req, res) => {
  const { q } = req.query;
  // TODO: replace with real NGO query
  const ngos = [
    { _id: 1, name: 'Helping Hands', tagline: 'Feeding the hungry', cover: '/images/logo1.png' },
    { _id: 2, name: 'Green Earth', tagline: 'Planting for a better future', cover: '/images/logo1.png' }
  ];
  res.render('donor/ngos', { donor: req.user, ngos, q });
});

// My Donations
module.exports.getDonations = catchAsync(async (req, res) => {
  // TODO: replace with Donation model query
  const donations = [
    { date: '2025-09-12', ngoId: 1, ngoName: 'Helping Hands', type: 'Food',  summary: '5 Lunch Boxes', status: 'Completed', receiptUrl: '' },
    { date: '2025-09-28', ngoId: 2, ngoName: 'Green Earth',   type: 'Money', summary: '$100',          status: 'Pending',   receiptUrl: '' }
  ];
  res.render('donor/donations', { donor: req.user, donations });
});

// Notifications
module.exports.getNotifications = catchAsync(async (req, res) => {
  const notifications = [
    { title: 'Donation Received', message: 'Your donation to Helping Hands was delivered.', timeAgo: '2 hours ago' },
    { title: 'NGO Update',        message: 'Green Earth started a new tree-planting campaign.', timeAgo: '1 day ago' }
  ];
  res.render('donor/notifications', { donor: req.user, notifications });
});

// Account
module.exports.getAccount = catchAsync(async (req, res) => {
  res.render('donor/account', { donor: req.user });
});
