
const Category = require('../models/category')

// get Random Integer
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

// ================ create Category ================
exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const categoryDetails = await Category.create({
            name: name, description: description
        });

        res.status(200).json({
            success: true,
            message: 'Category created successfully'
        });
    }
    catch (error) {
        console.log('Error while creating Category');
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error while creating Category',
            error: error.message
        })
    }
}


// ================ delete Category ================
exports.deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.body;

        if (!categoryId) {
            return res.status(400).json({
                success: false,
                message: 'categoryId is required'
            });
        }

        await Category.findByIdAndDelete(categoryId);

        res.status(200).json({
            success: true,
            message: 'Category deleted successfully'
        });
    }
    catch (error) {
        console.log('Error while deleting Category');
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error while deleting Category',
            error: error.message
        })
    }
}


// ================ get All Category ================
exports.showAllCategories = async (req, res) => {
    try {
        const allCategories = await Category.find({}, { name: true, description: true });

        res.status(200).json({
            success: true,
            data: allCategories,
            message: 'All categories fetched successfully'
        })
    }
    catch (error) {
        console.log('Error while fetching all categories');
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error while fetching all categories'
        })
    }
}


// ================ Get Category Page Details ================
exports.getCategoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body

        // ── 1. Selected category courses (with ratings + instructor) ──
        const selectedCategory = await Category.findById(categoryId)
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: [
                    { path: "ratingAndReviews" },   
                    { path: "instructor" },          
                ],
            })
            .exec()

        if (!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }

        if (selectedCategory.courses.length === 0) {
            return res.status(404).json({
                success: false,
                data: null,
                message: "No courses found for the selected category.",
            })
        }

        // ── 2. Different category courses (with ratings + instructor) ──
        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId },
        })

        let differentCategory = await Category.findOne(
            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id
        )
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: [
                    { path: "ratingAndReviews" },  
                    { path: "instructor" },          
                ],
            })
            .exec()

        // ── 3. Most selling courses across all categories (with ratings) ──
        const allCategories = await Category.find()
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: [
                    { path: "instructor" },
                    { path: "ratingAndReviews" },  
                ],
            })
            .exec()

        const allCourses = allCategories.flatMap((category) => category.courses)
        const mostSellingCourses = allCourses
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 10)

        res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategory,
                mostSellingCourses,
            },
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}