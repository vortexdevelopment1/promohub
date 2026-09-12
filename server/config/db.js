const mongoose = require('mongoose');

/**
 * ==========================================================
 * DATABASE CONFIGURATION (MongoDB Connection using Mongoose)
 * ==========================================================
 * Connects to MongoDB Atlas if reachable; otherwise falls back
 * automatically to the local MongoDB instance.
 */
const sanitizeExistingVideos = async () => {
  try {
    if (mongoose.connection && mongoose.connection.collection) {
      const collection = mongoose.connection.collection('videos');
      await collection.updateMany(
        {},
        { $unset: { thumbnail: '', thumbnailPublicId: '' } }
      );
    }
  } catch (err) {
    console.warn('⚠️ Non-critical video thumbnail cleanup note:', err.message);
  }
};

const connectDB = async () => {
  const primaryUri = process.env.MONGODB_URI;
  const localUri = 'mongodb://127.0.0.1:27017/stitch_agency';

  if (primaryUri) {
    try {
      const conn = await mongoose.connect(primaryUri, {
        serverSelectionTimeoutMS: 3000,
      });
      console.log(`✅ MongoDB Connected (Primary): ${conn.connection.host}`);
      sanitizeExistingVideos();
      return conn;
    } catch (error) {
      console.warn(`⚠️ Primary MongoDB Connection Failed (${error.message}). Switching to local fallback...`);
    }
  }

  try {
    const conn = await mongoose.connect(localUri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`✅ MongoDB Connected (Local Fallback): ${conn.connection.host}`);
    sanitizeExistingVideos();
    return conn;
  } catch (error) {
    console.error(`❌ All MongoDB Connections Failed: ${error.message}`);
  }
};

module.exports = connectDB;
