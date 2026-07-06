const Profile = require('../models/profile');
const User = require('../models/user');
const CourseProgress = require('../models/courseProgress')
const Course = require('../models/course')

const { uploadImageToCloudinary, deleteResourceFromCloudinary } = require('../utils/imageUploader');
const { convertSecondsToDuration } = require('../utils/secToDuration')


// ================ update Profile ================
exports.updateProfile = async (req, res) => {
    try {
        const { gender = '', dateOfBirth = "", about = "", contactNumber = '', firstName, lastName } = req.body;
        const userId = req.user.id;

        const userDetails = await User.findById(userId);
        if (!userDetails) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        userDetails.firstName = firstName;
        userDetails.lastName = lastName;
        await userDetails.save();

        profileDetails.gender = gender;
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();

        const updatedUserDetails = await User.findById(userId).populate({ path: 'additionalDetails' });

        return res.status(200).json({
            success: true,
            updatedUserDetails,
            message: 'Profile updated successfully'
        });
    }
    catch (error) {
        console.log('Error while updating profile:', error);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: 'Error while updating profile'
        });
    }
}


// ================ delete Account ================
exports.deleteAccount = async (req, res) => {
    try {
        const userId = req.user.id;

        const userDetails = await User.findById(userId);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (userDetails.image) {
            await deleteResourceFromCloudinary(userDetails.image).catch(err => {
                console.log('Profile image deletion failed (non-critical):', err.message);
            });
        }

        const userEnrolledCoursesId = userDetails.courses;
        for (const courseId of userEnrolledCoursesId) {
            await Course.findByIdAndUpdate(courseId, {
                $pull: { studentsEnrolled: userId }
            });
        }

        await Profile.findByIdAndDelete(userDetails.additionalDetails);
        await User.findByIdAndDelete(userId);

        return res.status(200).json({
            success: true,
            message: 'Account deleted successfully'
        });
    }
    catch (error) {
        console.log('Error while deleting account:', error);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: 'Error while deleting account'
        });
    }
}


// ================ get details of user ================
exports.getUserDetails = async (req, res) => {
    try {
        const userId = req.user.id;

        const userDetails = await User.findById(userId).populate('additionalDetails').exec();

        if (!userDetails) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.status(200).json({
            success: true,
            data: userDetails,
            message: 'User data fetched successfully'
        });
    }
    catch (error) {
        console.log('Error while fetching user details:', error);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: 'Error while fetching user details'
        });
    }
}


// ================ Update User profile Image ================
exports.updateUserProfileImage = async (req, res) => {
    try {
        // ========== DEBUG LOGS - remove after fixing ==========
        console.log("=== req.files ===", req.files)
        console.log("=== req.headers['content-type'] ===", req.headers['content-type'])
        console.log("=== req.body ===", req.body)
        // =======================================================

        if (!req.files || !req.files.profileImage) {
            return res.status(400).json({
                success: false,
                message: 'No image file received. Send the file with field name "profileImage" as multipart/form-data.'
            });
        }

        const profileImage = req.files.profileImage;
        const userId = req.user.id;

        const currentUser = await User.findById(userId);
        if (!currentUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const image = await uploadImageToCloudinary(
            profileImage,
            process.env.FOLDER_NAME,
            1000,
            1000
        );

        if (currentUser.image) {
            await deleteResourceFromCloudinary(currentUser.image).catch(err => {
                console.log('Old image deletion failed (non-critical):', err.message);
            });
        }

        const updatedUserDetails = await User.findByIdAndUpdate(
            userId,
            { image: image.secure_url },
            { new: true }
        ).populate({ path: 'additionalDetails' });

        return res.status(200).json({
            success: true,
            message: 'Image updated successfully',
            data: updatedUserDetails,
        });
    }
    catch (error) {
        console.log('Error while updating user profile image:', error);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: 'Error while updating user profile image',
        });
    }
}


// ================ Get Enrolled Courses ================
exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;

        let userDetails = await User.findOne({ _id: userId })
            .populate({
                path: "courses",
                populate: {
                    path: "courseContent",
                    populate: {
                        path: "subSection",
                    },
                },
            })
            .exec();

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: `Could not find user with id: ${userId}`,
            });
        }

        userDetails = userDetails.toObject();

        for (var i = 0; i < userDetails.courses.length; i++) {
            let totalDurationInSeconds = 0;
            let subsectionLength = 0;

            for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
                totalDurationInSeconds += userDetails.courses[i].courseContent[j].subSection.reduce(
                    (acc, curr) => acc + parseInt(curr.timeDuration), 0
                );
                userDetails.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds);
                subsectionLength += userDetails.courses[i].courseContent[j].subSection.length;
            }

            let courseProgressCount = await CourseProgress.findOne({
                courseID: userDetails.courses[i]._id,
                userId: userId,
            });

            const completedCount = courseProgressCount?.completedVideos?.length || 0;

            if (subsectionLength === 0) {
                userDetails.courses[i].progressPercentage = 100;
            } else {
                const multiplier = Math.pow(10, 2);
                userDetails.courses[i].progressPercentage =
                    Math.round((completedCount / subsectionLength) * 100 * multiplier) / multiplier;
            }
        }

        return res.status(200).json({
            success: true,
            data: userDetails.courses,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


// ================ instructor Dashboard ================
exports.instructorDashboard = async (req, res) => {
    try {
        const courseDetails = await Course.find({ instructor: req.user.id });

        const courseData = courseDetails.map((course) => {
            const totalStudentsEnrolled = course.studentsEnrolled.length;
            const totalAmountGenerated = totalStudentsEnrolled * course.price;

            return {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                totalStudentsEnrolled,
                totalAmountGenerated,
            };
        });

        return res.status(200).json({
            success: true,
            courses: courseData,
            message: 'Instructor Dashboard Data fetched successfully'
        });
    } catch (error) {
        console.error('Error in instructorDashboard:', error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
}


// ================ get All Students ================
exports.getAllStudents = async (req, res) => {
    try {
        const allStudentsDetails = await User.find({ accountType: 'Student' })
            .populate('additionalDetails')
            .populate('courses')
            .sort({ createdAt: -1 });

        const studentsCount = await User.countDocuments({ accountType: 'Student' });

        return res.status(200).json({
            success: true,
            allStudentsDetails,
            studentsCount,
            message: 'All Students Data fetched successfully'
        });
    } catch (error) {
        console.error('Error in getAllStudents:', error);
        return res.status(500).json({
            success: false,
            message: 'Error while fetching all students',
            error: error.message
        });
    }
}


// ================ get All Instructors ================
exports.getAllInstructors = async (req, res) => {
    try {
        const allInstructorsDetails = await User.find({ accountType: 'Instructor' })
            .populate('additionalDetails')
            .populate('courses')
            .sort({ createdAt: -1 });

        const instructorsCount = await User.countDocuments({ accountType: 'Instructor' });

        return res.status(200).json({
            success: true,
            allInstructorsDetails,
            instructorsCount,
            message: 'All Instructors Data fetched successfully'
        });
    } catch (error) {
        console.error('Error in getAllInstructors:', error);
        return res.status(500).json({
            success: false,
            message: 'Error while fetching all Instructors',
            error: error.message
        });
    }
}

// ================ update User Approval (Admin only) ================
exports.updateUserApproval = async (req, res) => {
  try {
    const { userId, approved } = req.body
    if (!userId || approved === undefined) {
      return res.status(400).json({ success: false, message: "userId and approved are required" })
    }
    const user = await User.findByIdAndUpdate(userId, { approved }, { new: true })
    if (!user) return res.status(404).json({ success: false, message: "User not found" })
    return res.status(200).json({ success: true, message: `User ${approved ? "approved" : "rejected"} successfully`, user })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}