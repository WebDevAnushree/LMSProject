
const express = require('express');
const router = express.Router();

const {
    signup,
    login,
    sendOTP,
    changePassword
} = require('../controllers/auth');

const {
    resetPasswordToken,
    resetPassword,
} = require('../controllers/resetPassword');

const { auth, isAdmin } = require('../middleware/auth');
const { getAllStudents, getAllInstructors, updateUserApproval } = require('../controllers/profile');

// Auth routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/sendotp', sendOTP);
router.post('/changepassword', auth, changePassword);

// Reset Password
router.post('/reset-password-token', resetPasswordToken);
router.post("/reset-password", resetPassword);

// Admin only
router.get("/all-students", auth, isAdmin, getAllStudents);
router.get("/all-instructors", auth, isAdmin, getAllInstructors);
router.post("/update-approval", auth, isAdmin, updateUserApproval);

module.exports = router;