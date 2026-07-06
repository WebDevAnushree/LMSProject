
const cloudinary = require('cloudinary').v2;

exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
    if (!file) {
        throw new Error('No file provided to uploadImageToCloudinary. Check that the request includes a file and the field name matches.');
    }

    try {
        const options = { folder };
        if (height) options.height = height;
        if (quality) options.quality = quality;
        options.resource_type = 'auto';

        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        return result;
    }
    catch (error) {
        console.log("Error while uploading image to Cloudinary:", error.message);
        throw error;
    }
}

exports.deleteResourceFromCloudinary = async (url) => {
    if (!url) return;

    try {
        const result = await cloudinary.uploader.destroy(url);
        console.log(`Deleted resource with public ID: ${url}`);
        return result;
    } catch (error) {
        console.error(`Error deleting resource with public ID ${url}:`, error);
        throw error;
    }
};