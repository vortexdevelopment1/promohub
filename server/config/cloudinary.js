const cloudinary = require('cloudinary').v2;

/**
 * ==========================================================
 * CLOUDINARY CONFIGURATION
 * ==========================================================
 * Cloudinary is a cloud service for storing and optimizing media files
 * (videos and images) without storing them directly in MongoDB or disk.
 * 
 * We configure the SDK with credentials provided in .env:
 * - cloud_name
 * - api_key
 * - api_secret
 */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
