const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

/**
 * ==========================================================
 * CLOUDINARY STREAM UPLOAD UTILITY
 * ==========================================================
 * Why use streams?
 * Multer loads uploaded file bytes into memory (`file.buffer`).
 * Instead of saving files to the local hard drive (which can run out of disk space
 * or fail on serverless platforms), `streamifier` converts the memory buffer into
 * a readable stream and pipes it directly to Cloudinary's upload stream.
 *
 * @param {Buffer} buffer - File buffer from Multer (in memory)
 * @param {string} resourceType - 'video' or 'image' or 'auto'
 * @param {string} folder - Folder name in Cloudinary
 * @returns {Promise<Object>} Resolves to the Cloudinary upload result containing secure_url
 */
const uploadStreamToCloudinary = (buffer, resourceType = 'auto', folder = 'stitch_agency_videos') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) {
          console.error(`❌ Cloudinary Upload Error [${resourceType}]:`, error);
          return reject(error);
        }
        resolve(result);
      }
    );

// Convert the in-memory buffer into a readable stream and pipe to Cloudinary
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

/**
 * ==========================================================
 * CLOUDINARY DELETE UTILITY
 * ==========================================================
 * Safely destroys an asset in Cloudinary given its public_id
 * and resource_type ('video' or 'image').
 *
 * @param {string} publicId - The Cloudinary public_id of the asset
 * @param {string} resourceType - 'video' or 'image' (default: 'image')
 * @returns {Promise<Object|null>} Cloudinary result or null if missing/failed
 */
const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  if (!publicId) return null;
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
      invalidate: true,
    });
    return result;
  } catch (error) {
    console.error(`❌ Cloudinary Delete Error [${resourceType} - ${publicId}]:`, error);
    return null;
  }
};

module.exports = {
  uploadStreamToCloudinary,
  deleteFromCloudinary,
};
