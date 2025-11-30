const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// ⭐ Use Cloudinary storage instead of disk storage
const { storage } = require('../config/cloudinary.config');

// ⭐ Multer using Cloudinary works on Vercel
const upload = multer({ storage });

// ---------------- ROUTES ----------------

// Logout
router.get('/logout', authMiddleware.isLoggedIn, authController.logoutUser);

// Change password
router.post('/change-password', authMiddleware.isLoggedIn, authController.handleChangePassword);

// Only logged-out users can access login/register
router.use(authMiddleware.isLoggedOut);

// Login page
router.get('/login', authController.renderLoginPage);

// Login submit
router.post('/login',
    passport.authenticate('local', {
        failureRedirect: '/auth/login',
        failureMessage: true
    }),
    authController.loginUser
);

// Register page
router.get('/register', authController.renderRegisterPage);

// ⭐ Registration with Cloudinary uploads
router.post('/register',
    upload.any(),
    authMiddleware.validateRegistrationData,
    authController.registerUser
);

// Forgot password
router.get('/forgot-password', authController.renderForgotPasswordPage);

// Forgot password submit
router.post('/forgot-password', authController.handleForgotPassword);

// Reset password page
router.get('/reset-password/:token', authController.renderResetPasswordPage);

// Reset password submit
router.post('/reset-password/:token', authController.handleResetPassword);

module.exports = router;