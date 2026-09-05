const mongoose = require('mongoose');

/**
 * ==========================================================
 * VIDEO MODEL & SCHEMA (MongoDB with Mongoose)
 * ==========================================================
 * A Schema defines the shape and structure of documents within a MongoDB collection.
 * 
 * Fields:
 * - title: Short title of the project / video reel (Required)
 * - description: Brief summary / description of the reel
 * - videoUrl: Cloudinary secure URL of the uploaded video (Required)
 * - thumbnail: Cloudinary secure URL of the video poster/thumbnail image (Required)
 * - order: Display sequence/priority in the carousel (Default: 0)
 * - createdAt: Timestamp of creation
 */
const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Video title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    videoUrl: {
      type: String,
      required: [true, 'Video URL is required'],
    },
    thumbnail: {
      type: String,
      required: [true, 'Thumbnail image URL is required'],
    },
    order: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Video', videoSchema);
