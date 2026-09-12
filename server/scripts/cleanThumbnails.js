const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env from server directory
dotenv.config({ path: path.join(__dirname, '../.env') });

const Video = require('../models/Video');

/**
 * Clean up existing video records in MongoDB:
 * Safely removes `thumbnail` and `thumbnailPublicId` fields from all video documents
 * without deleting or modifying any video files, video URLs, or records.
 */
const cleanupDatabaseThumbnails = async () => {
  const primaryUri = process.env.MONGODB_URI;
  const localUri = 'mongodb://127.0.0.1:27017/stitch_agency';

  let connected = false;

  if (primaryUri) {
    try {
      await mongoose.connect(primaryUri, { serverSelectionTimeoutMS: 4000 });
      console.log('✅ Connected to Primary MongoDB');
      connected = true;
    } catch (err) {
      console.warn(`⚠️ Primary MongoDB connection failed (${err.message}). Trying local fallback...`);
    }
  }

  if (!connected) {
    try {
      await mongoose.connect(localUri, { serverSelectionTimeoutMS: 4000 });
      console.log('✅ Connected to Local MongoDB');
      connected = true;
    } catch (err) {
      console.error(`❌ Could not connect to MongoDB: ${err.message}`);
      process.exit(1);
    }
  }

  try {
    const rawCollection = mongoose.connection.collection('videos');
    const result = await rawCollection.updateMany(
      {},
      { $unset: { thumbnail: '', thumbnailPublicId: '' } }
    );

    console.log(`🎉 Database cleanup complete: Matched ${result.matchedCount} records, modified ${result.modifiedCount} records.`);

    // Verify records
    const videos = await rawCollection.find({}).toArray();
    console.log('📋 Current Video Records in DB:');
    videos.forEach((v) => {
      console.log(` - ID: ${v._id} | Title: "${v.title}" | videoUrl: ${v.videoUrl} | Has Thumbnail Field: ${v.thumbnail !== undefined}`);
    });
  } catch (error) {
    console.error('❌ Error during thumbnail cleanup:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
};

cleanupDatabaseThumbnails();
