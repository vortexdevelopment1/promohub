const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB Database
connectDB();

// Initialize Express Application
const app = express();

// ==========================================================
// MIDDLEWARES
// ==========================================================
// Enable Cross-Origin Resource Sharing (CORS) so frontend on port 3000 can communicate with backend on port 5000
app.use(cors());

// Parse incoming JSON payloads
app.use(express.json());

// Parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// ==========================================================
// API ROUTES
// ==========================================================
// Admin Authentication Routes
app.use('/api/admin', require('./routes/authRoutes'));

// Portfolio Video CRUD Routes
app.use('/api/videos', require('./routes/videoRoutes'));

// Contact Us Enquiries Routes
app.use('/api/contact', require('./routes/contactRoutes'));

// Root Health Check Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🚀 Stitch Neon Agency Portfolio Backend API is running.',
    endpoints: {
      publicVideos: 'GET /api/videos',
      adminLogin: 'POST /api/admin/login',
      manageVideos: 'POST | PUT | DELETE /api/videos',
    },
  });
});

// ==========================================================
// GLOBAL ERROR HANDLER
// ==========================================================
app.use((err, req, res, next) => {
  console.error('❌ Global Server Error:', err);
  return res.status(err.status || 500).json({
    success: false,
    message: err.message || 'An unexpected server error occurred.',
  });
});

// ==========================================================
// START SERVER
// ==========================================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✨ Server running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`);
});
