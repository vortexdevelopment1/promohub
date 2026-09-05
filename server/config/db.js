const mongoose = require('mongoose');

/**
 * ==========================================================
 * DATABASE CONFIGURATION (MongoDB Connection using Mongoose)
 * ==========================================================
 * This function connects our Express server to the MongoDB database.
 * We use mongoose.connect() with the URI stored in our .env file.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/stitch_agency');
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // Do not crash the entire app if database is temporarily unavailable during dev
    console.log('⚠️ Running in fallback mode or waiting for database reconnection.');
  }
};

module.exports = connectDB;
