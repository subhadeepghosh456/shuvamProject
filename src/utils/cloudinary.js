const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

cloudinary.config({
  cloud_name:'dqq8k0osl', // Fixed spelling
  api_key: "265343799791361",
  api_secret: "MH6c8jX91afQypoFLP7dQ9t0Ja0", // Fixed spelling
});

console.log(
  process.env.CLOUDINARY_CLOUD_NAME,
  process.env.CLOUDINARY_API_KEY,
  process.env.CLOUDINARY_API_SECRET
);

const uploadOnCloudinary = async (localFilePath) => {
  try {
    // Validation checks
    if (!localFilePath) {
      throw new Error("No file path provided");
    }

    if (!fs.existsSync(localFilePath)) {
      throw new Error(`File does not exist at path: ${localFilePath}`);
    }

    // Get file stats to check if it's actually a file
    const stats = fs.statSync(localFilePath);
    if (!stats.isFile()) {
      throw new Error(`Path is not a file: ${localFilePath}`);
    }

    // Check file size (optional - prevents uploading empty files)
    if (stats.size === 0) {
      throw new Error("File is empty");
    }

    console.log(`Uploading file: ${localFilePath} (${stats.size} bytes)`);

    // Upload to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "orders", // Optional: organize uploads in folders
    });

    console.log("Upload successful:", response.secure_url);

    // Clean up local file
    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    console.error("Cloudinary upload failed:", error.message);

    // Clean up the temp file if it exists
    try {
      if (localFilePath && fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
        console.log("Cleaned up temporary file");
      }
    } catch (cleanupError) {
      console.error("Failed to clean up temp file:", cleanupError.message);
    }

    return null;
  }
};

module.exports = { uploadOnCloudinary };
