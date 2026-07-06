
const Course = require('../models/course');
const Section = require('../models/section');


// ================ Create Section ================
exports.createSection = async (req, res) => {
    try {

        // extract data
        const { sectionName, courseId } = req.body;

        // validation
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // create new section
        const newSection = await Section.create({
            sectionName
        });

        // add section id into courseContent array
        await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: newSection._id
                }
            },
            { new: true }
        );

        // fetch updated course details
        const updatedCourseDetails = await Course.findById(courseId)
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection"
                }
            });

        // response
        return res.status(200).json({
            success: true,
            data: updatedCourseDetails,
            message: "Section created successfully"
        });
  
    } catch (error) {

        console.log("Error while creating section");
        console.log(error);

        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while creating section"
        });
    }
};



// ================ Update Section ================
exports.updateSection = async (req, res) => {

    try {

        // extract data
        const { sectionName, sectionId, courseId } = req.body;

        // validation
        if (!sectionName || !sectionId || !courseId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // update section
        await Section.findByIdAndUpdate(
            sectionId,
            {
                sectionName
            },
            { new: true }
        );

        // fetch updated course details
        const updatedCourseDetails = await Course.findById(courseId)
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection"
                }
            });

        // response
        return res.status(200).json({
            success: true,
            data: updatedCourseDetails,
            message: "Section updated successfully"
        });

    } catch (error) {

        console.log("Error while updating section");
        console.log(error);

        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while updating section"
        });
    }
};




// ================ Delete Section ================
exports.deleteSection = async (req, res) => {

    try {

        // extract data
        const { sectionId, courseId } = req.body;

        // validation
        if (!sectionId || !courseId) {
            return res.status(400).json({
                success: false,
                message: "SectionId and CourseId are required"
            });
        }

        // remove section reference from course
        await Course.findByIdAndUpdate(
            courseId,
            {
                $pull: {
                    courseContent: sectionId
                }
            },
            { new: true }
        );

        // delete section
        await Section.findByIdAndDelete(sectionId);

        // fetch updated course details
        const updatedCourseDetails = await Course.findById(courseId)
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection"
                }
            });

        // response
        return res.status(200).json({
            success: true,
            data: updatedCourseDetails,
            message: "Section deleted successfully"
        });

    } catch (error) {

        console.log("Error while deleting section");
        console.log(error);

        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while deleting section"
        });
    }
};