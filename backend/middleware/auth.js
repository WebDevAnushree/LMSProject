const jwt = require("jsonwebtoken");
require('dotenv').config();


exports.auth = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '').trim()
            || req.cookies?.token
            || req.body?.token;

        if (!token) {
            return res.status(401).json({ success: false, message: 'Token is missing' });
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
        }
        catch (error) {
            return res.status(401).json({
                success: false,
                error: error.message,
                message: 'Token is invalid or expired'
            });
        }

        next();
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Error while validating token' });
    }
}


exports.isStudent = (req, res, next) => {
    try {
        if (req.user?.accountType !== 'Student') {
            return res.status(403).json({ success: false, message: 'This page is accessible only to Students' });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error.message, message: 'Error while checking Student role' });
    }
}


exports.isInstructor = (req, res, next) => {
    try {
        if (req.user?.accountType !== 'Instructor') {
            return res.status(403).json({ success: false, message: 'This page is accessible only to Instructors' });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error.message, message: 'Error while checking Instructor role' });
    }
}


exports.isAdmin = (req, res, next) => {
    try {
        if (req.user?.accountType !== 'Admin') {
            return res.status(403).json({ success: false, message: 'This page is accessible only to Admins' });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error.message, message: 'Error while checking Admin role' });
    }
}