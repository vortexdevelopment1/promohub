const Video = require('../models/Video');
const { uploadStreamToCloudinary } = require('../utils/cloudinaryUpload');

/**
 * ==========================================================
 * VIDEO CONTROLLER (MongoDB CRUD & Cloudinary Integration)
 * ==========================================================
 * Handles all business logic for portfolio videos:
 * 1. GET /api/videos        - Get all videos (Public)
 * 2. POST /api/videos       - Create a new video (Admin protected, max 10 videos limit)
 * 3. PUT /api/videos/:id    - Update an existing video (Admin protected)
 * 4. DELETE /api/videos/:id - Delete a video (Admin protected)
 */

/**
 * @desc    Get all videos (Public)
 * @route   GET /api/videos
 * @access  Public
 */
const getVideos = async (req, res) => {
  try {
    // Mongoose READ: Find all videos and sort by `order` ascending, then `createdAt` descending
    const videos = await Video.find({}).sort({ order: 1, createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: videos.length,
      data: videos,
    });
  } catch (error) {
    console.error('❌ Get Videos Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch videos from database.',
      error: error.message,
    });
  }
};

/**
 * @desc    Upload and create a new video (Max 10 videos)
 * @route   POST /api/videos
 * @access  Private (Admin only)
 */
const createVideo = async (req, res) => {
  try {
    // 1. Enforce 10-Video Limit
    const currentVideoCount = await Video.countDocuments();
    if (currentVideoCount >= 10) {
      return res.status(400).json({
        success: false,
        message: 'Maximum 10 videos allowed',
      });
    }

    const { title, description, order, videoUrl: bodyVideoUrl, thumbnail: bodyThumbnail } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Video title is required.',
      });
    }

    let finalVideoUrl = bodyVideoUrl || '';
    let finalThumbnailUrl = bodyThumbnail || '';

    // 2. Upload Video file to Cloudinary if uploaded via FormData
    if (req.files && req.files.video && req.files.video[0]) {
      const videoFile = req.files.video[0];
      const videoResult = await uploadStreamToCloudinary(videoFile.buffer, 'video', 'stitch_agency/videos');
      finalVideoUrl = videoResult.secure_url;
    }

    // 3. Upload Thumbnail file to Cloudinary if uploaded via FormData
    if (req.files && req.files.thumbnail && req.files.thumbnail[0]) {
      const thumbFile = req.files.thumbnail[0];
      const thumbResult = await uploadStreamToCloudinary(thumbFile.buffer, 'image', 'stitch_agency/thumbnails');
      finalThumbnailUrl = thumbResult.secure_url;
    }

    // Validation: Ensure we have both video and thumbnail URLs
    if (!finalVideoUrl) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a video file or provide a video URL.',
      });
    }

    if (!finalThumbnailUrl) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a thumbnail image or provide a thumbnail URL.',
      });
    }

    // 4. Mongoose CREATE: Save new video document in MongoDB
    const newVideo = await Video.create({
      title: title.trim(),
      description: description ? description.trim() : '',
      videoUrl: finalVideoUrl,
      thumbnail: finalThumbnailUrl,
      order: order ? Number(order) : currentVideoCount + 1,
    });

    return res.status(201).json({
      success: true,
      message: 'Video uploaded and created successfully.',
      data: newVideo,
    });
  } catch (error) {
    console.error('❌ Create Video Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create video.',
      error: error.message,
    });
  }
};

/**
 * @desc    Update an existing video
 * @route   PUT /api/videos/:id
 * @access  Private (Admin only)
 */
const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, order, videoUrl, thumbnail } = req.body;

    // Mongoose READ by ID: Find existing video
    const existingVideo = await Video.findById(id);
    if (!existingVideo) {
      return res.status(404).json({
        success: false,
        message: 'Video not found.',
      });
    }

    // Update text fields if provided
    if (title !== undefined) existingVideo.title = title.trim();
    if (description !== undefined) existingVideo.description = description.trim();
    if (order !== undefined) existingVideo.order = Number(order);
    if (videoUrl !== undefined && videoUrl.trim()) existingVideo.videoUrl = videoUrl.trim();
    if (thumbnail !== undefined && thumbnail.trim()) existingVideo.thumbnail = thumbnail.trim();

    // Check if a new video file was uploaded to replace the existing one
    if (req.files && req.files.video && req.files.video[0]) {
      const videoFile = req.files.video[0];
      const videoResult = await uploadStreamToCloudinary(videoFile.buffer, 'video', 'stitch_agency/videos');
      existingVideo.videoUrl = videoResult.secure_url;
    }

    // Check if a new thumbnail image was uploaded to replace the existing one
    if (req.files && req.files.thumbnail && req.files.thumbnail[0]) {
      const thumbFile = req.files.thumbnail[0];
      const thumbResult = await uploadStreamToCloudinary(thumbFile.buffer, 'image', 'stitch_agency/thumbnails');
      existingVideo.thumbnail = thumbResult.secure_url;
    }

    // Mongoose UPDATE: Save updated document
    const updatedVideo = await existingVideo.save();

    return res.status(200).json({
      success: true,
      message: 'Video updated successfully.',
      data: updatedVideo,
    });
  } catch (error) {
    console.error('❌ Update Video Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update video.',
      error: error.message,
    });
  }
};

/**
 * @desc    Delete a video
 * @route   DELETE /api/videos/:id
 * @access  Private (Admin only)
 */
const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;

    // Mongoose DELETE: Find by ID and remove document from MongoDB
    const deletedVideo = await Video.findByIdAndDelete(id);

    if (!deletedVideo) {
      return res.status(404).json({
        success: false,
        message: 'Video not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Video deleted successfully.',
      data: deletedVideo,
    });
  } catch (error) {
    console.error('❌ Delete Video Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete video.',
      error: error.message,
    });
  }
};

module.exports = {
  getVideos,
  createVideo,
  updateVideo,
  deleteVideo,
};
