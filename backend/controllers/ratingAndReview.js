
const User = require('../models/user')
const Course = require('../models/course')
const RatingAndReview = require('../models/ratingAndReview')
const mongoose = require('mongoose');


// ================ Create Rating ================
exports.createRating = async (req, res) => {
    try {
        const { rating, review, courseId } = req.body;
        const userId = req.user.id;

        // validation
        if (!rating || !review || !courseId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // ✅ FIX: fetch the full course document first
        // Old code used a projection { studentsEnrolled: { $elemMatch } } which
        // always returned the course doc (even when student wasn't enrolled),
        // so the enrollment check never actually blocked anyone.
        const courseDetails = await Course.findById(courseId);

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        // ✅ FIX: explicitly verify the user is in studentsEnrolled
        const isEnrolled = courseDetails.studentsEnrolled.some(
            (id) => id.toString() === userId.toString()
        );

        if (!isEnrolled) {
            return res.status(403).json({
                success: false,
                message: 'You must be enrolled in the course to leave a review'
            });
        }

        // check if user already reviewed this course
        const alreadyReviewed = await RatingAndReview.findOne({
            course: courseId,
            user: userId
        });

        if (alreadyReviewed) {
            return res.status(403).json({
                success: false,
                message: 'You have already reviewed this course'
            });
        }

        // create entry in DB
        const ratingReview = await RatingAndReview.create({
            user: userId,
            course: courseId,
            rating,
            review
        });

        // link this rating to the course
        await Course.findByIdAndUpdate(
            courseId,
            { $push: { ratingAndReviews: ratingReview._id } },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            data: ratingReview,
            message: "Rating and Review created successfully",
        });
    }
    catch (error) {
        console.log('Error while creating rating and review');
        console.log(error);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: 'Error while creating rating and review',
        });
    }
}


// ================ Get Average Rating ================
exports.getAverageRating = async (req, res) => {
    try {
        const courseId = req.body.courseId;

        // ✅ FIX: guard against missing courseId before running aggregate
        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: 'courseId is required'
            });
        }

        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                }
            }
        ]);

        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            });
        }

        // no ratings yet
        return res.status(200).json({
            success: true,
            message: 'No ratings given yet',
            averageRating: 0,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


// ================ Get All Rating And Reviews ================
exports.getAllRatingReview = async (req, res) => {
    try {
        const allReviews = await RatingAndReview.find({})
            .sort({ rating: 'desc' })
            .populate({
                path: 'user',
                select: 'firstName lastName email image'
            })
            .populate({
                path: 'course',
                select: 'courseName'
            })
            .exec();

        return res.status(200).json({
            success: true,
            data: allReviews,
            message: "All reviews fetched successfully"
        });
    }
    catch (error) {
        console.log('Error while fetching all ratings');
        console.log(error);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: 'Error while fetching all ratings',
        });
    }
}