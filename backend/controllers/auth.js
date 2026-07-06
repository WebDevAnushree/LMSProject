const User = require('./../models/user');
const Profile = require('./../models/profile');
const optGenerator = require('otp-generator');
const OTP = require('../models/OTP')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const mailSender = require('../utils/mailSender');
const otpTemplate = require('../mail/templates/emailVerificationTemplate');
const { passwordUpdated } = require("../mail/templates/passwordUpdate");


exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        const checkUserPresent = await User.findOne({ email });
        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: 'User is Already Registered'
            });
        }

        const otp = optGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });

        const name = email.split('@')[0].split('.').map(part => part.replace(/\d+/g, '')).join(' ');
        await mailSender(email, 'OTP Verification Email', otpTemplate(otp, name));
        await OTP.create({ email, otp });

        return res.status(200).json({
            success: true,
            message: 'Otp sent successfully'
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error while generating Otp',
            error: error.message
        });
    }
}


exports.signup = async (req, res) => {
    try {
        const {
            firstName, lastName, email, password, confirmPassword,
            accountType, contactNumber, otp
        } = req.body;

        if (!firstName || !lastName || !email || !password || !confirmPassword || !accountType || !otp) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Password & confirm password do not match'
            });
        }

        const checkUserAlreadyExists = await User.findOne({ email });
        if (checkUserAlreadyExists) {
            return res.status(400).json({
                success: false,
                message: 'User already registered, please login'
            });
        }

        const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 }).limit(1);
        if (!recentOtp) {
            return res.status(400).json({
                success: false,
                message: 'OTP not found, please try again'
            });
        }

        if (otp !== recentOtp.otp) {
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null
        });

        // ✅ Everyone is approved on signup
        const approved = true;

        await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            contactNumber,
            accountType,
            additionalDetails: profileDetails._id,
            approved,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        });

        return res.status(200).json({
            success: true,
            message: 'User registered successfully'
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: 'User cannot be registered, please try again'
        });
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        let user = await User.findOne({ email }).populate('additionalDetails');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'You are not registered with us'
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Password does not match'
            });
        }

        const payload = {
            email: user.email,
            id: user._id,
            accountType: user.accountType
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });

        user = user.toObject();
        user.password = undefined;
        user.token = undefined;
        user.resetPasswordTokenExpires = undefined;

        const cookieOptions = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true
        };

        return res.cookie('token', token, cookieOptions).status(200).json({
            success: true,
            token,
            user,
            message: 'User logged in successfully'
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: 'Error while logging in'
        });
    }
}


exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmNewPassword } = req.body;

        if (!oldPassword || !newPassword || !confirmNewPassword) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        if (oldPassword === newPassword) {
            return res.status(400).json({ success: false, message: 'New password cannot be same as old password' });
        }

        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ success: false, message: 'New password and confirm password do not match' });
        }

        const userDetails = await User.findById(req.user.id);
        const isPasswordMatch = await bcrypt.compare(oldPassword, userDetails.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ success: false, message: 'Old password is incorrect' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUserDetails = await User.findByIdAndUpdate(
            req.user.id,
            { password: hashedPassword },
            { new: true }
        );

        try {
            await mailSender(
                updatedUserDetails.email,
                'Password updated successfully',
                passwordUpdated(
                    updatedUserDetails.email,
                    `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                )
            );
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error sending password update email',
                error: error.message,
            });
        }

        return res.status(200).json({ success: true, message: 'Password changed successfully' });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: 'Error while changing password'
        });
    }
}