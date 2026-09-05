const express = require('express');
const router = express.Router();
const {
  getVideos,
  createVideo,
  updateVideo,
  deleteVideo,
} = require('../controllers/videoController');
const requireAdminAuth = require('../middleware/auth');
const uploadVideoFiles = require('../middleware/upload');

/**
 * ==========================================================
 * VIDEO API ROUTES
 * ==========================================================
 * 
 * Public Routes:
 * GET  /api/videos        -> Fetch all portfolio videos
 * 
 * Protected Routes (Requires JWT Header: Authorization: Bearer <token>):
 * POST /api/videos        -> Upload & create new video (max 10 limit)
 * POST /api/videos/upload -> Alias for video creation
 * PUT  /api/videos/:id    -> Edit video details or replace media
 * DELETE /api/videos/:id  -> Delete video
 */

// Public endpoint for homepage carousel
router.get('/', getVideos);

// Protected Admin endpoints
router.post('/', requireAdminAuth, uploadVideoFiles, createVideo);
router.post('/upload', requireAdminAuth, uploadVideoFiles, createVideo);
router.put('/:id', requireAdminAuth, uploadVideoFiles, updateVideo);
router.delete('/:id', requireAdminAuth, deleteVideo);

module.exports = router;
