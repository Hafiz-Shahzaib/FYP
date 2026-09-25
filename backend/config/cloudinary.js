import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import "dotenv/config";

// Configure Cloudinary once
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Existing helper (used by course/lecture uploads)
const uploadOnCloudinary = async (filePath) => {
  if (!filePath) return null;

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error.message);
    throw error;
  } finally {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};

export default uploadOnCloudinary;


// Assignment and submission upload helper
export const uploadFileWithDetails = async (filePath) => {
  if (!filePath) return null;

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format || "",
      size: result.bytes || 0,
    };
  } catch (error) {
    console.error("Cloudinary file upload error:", error.message);
    throw error;
  } finally {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};
