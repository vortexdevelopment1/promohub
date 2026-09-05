const Video = require('../models/Video');
const { uploadStreamToCloudinary, deleteFromCloudinary } = require('../utils/cloudinaryUpload');

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
  let videoResult = null;
  let thumbnailResult = null;

  try {
    // 1. Enforce 10-Video Limit
    const currentVideoCount = await Video.countDocuments();
    if (currentVideoCount >= 10) {
      return res.status(400).json({
        success: false,
        message: 'Maximum 10 videos allowed',
      });
    }

    const { title, description, order } = req.body;

    // 2. Validate title
    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Video title is required.',
      });
    }

    // 3. Require actual uploaded files (No manual URL creation allowed)
    const videoFile = req.files && req.files.video && req.files.video[0];
    const thumbFile = req.files && req.files.thumbnail && req.files.thumbnail[0];

    if (!videoFile) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a video file. Video file is required.',
      });
    }

    if (!thumbFile) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a thumbnail image. Thumbnail image is required.',
      });
    }

    // 4. Upload files to Cloudinary
    try {
      videoResult = await uploadStreamToCloudinary(videoFile.buffer, 'video', 'stitch_agency/videos');
      thumbnailResult = await uploadStreamToCloudinary(thumbFile.buffer, 'image', 'stitch_agency/thumbnails');
    } catch (uploadError) {
      // Clean up any successfully uploaded asset before failure
      if (videoResult && videoResult.public_id) {
        await deleteFromCloudinary(videoResult.public_id, 'video');
      }
      if (thumbnailResult && thumbnailResult.public_id) {
        await deleteFromCloudinary(thumbnailResult.public_id, 'image');
      }
      console.error('❌ Cloudinary Upload Error during video creation:', uploadError);
      return res.status(500).json({
        success: false,
        message: 'Failed to upload media files to Cloudinary.',
        error: uploadError.message,
      });
    }

    // 5. Mongoose CREATE: Save new video document in MongoDB with Cloudinary URLs & Public IDs
    try {
      const newVideo = await Video.create({
        title: title.trim(),
        description: description ? description.trim() : '',
        videoUrl: videoResult.secure_url,
        videoPublicId: videoResult.public_id,
        thumbnail: thumbnailResult.secure_url,
        thumbnailPublicId: thumbnailResult.public_id,
        order: order !== undefined && order !== '' ? Number(order) : currentVideoCount + 1,
      });

      return res.status(201).json({
        success: true,
        message: 'Video uploaded and created successfully.',
        data: newVideo,
      });
    } catch (dbError) {
      // If MongoDB save fails, delete the newly uploaded Cloudinary files to avoid orphaned assets
      if (videoResult && videoResult.public_id) {
        await deleteFromCloudinary(videoResult.public_id, 'video');
      }
      if (thumbnailResult && thumbnailResult.public_id) {
        await deleteFromCloudinary(thumbnailResult.public_id, 'image');
      }
      console.error('❌ Database Save Error during video creation:', dbError);
      return res.status(500).json({
        success: false,
        message: 'Failed to save video to database.',
        error: dbError.message,
      });
    }
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
  let newVideoResult = null;
  let newThumbnailResult = null;

  try {
    const { id } = req.params;
    const { title, description, order } = req.body;

    // 1. Mongoose READ by ID: Find existing video
    const existingVideo = await Video.findById(id);
    if (!existingVideo) {
      return res.status(404).json({
        success: false,
        message: 'Video not found.',
      });
    }

    // Store old public IDs for deletion after successful replacement
    const oldVideoPublicId = existingVideo.videoPublicId;
    const oldThumbnailPublicId = existingVideo.thumbnailPublicId;

    // 2. Upload replacement video file if provided
    if (req.files && req.files.video && req.files.video[0]) {
      const videoFile = req.files.video[0];
      try {
        newVideoResult = await uploadStreamToCloudinary(videoFile.buffer, 'video', 'stitch_agency/videos');
        existingVideo.videoUrl = newVideoResult.secure_url;
        existingVideo.videoPublicId = newVideoResult.public_id;
      } catch (uploadError) {
        console.error('❌ Cloudinary Video Replacement Upload Error:', uploadError);
        return res.status(500).json({
          success: false,
          message: 'Failed to upload replacement video to Cloudinary.',
          error: uploadError.message,
        });
      }
    }

    // 3. Upload replacement thumbnail image if provided
    if (req.files && req.files.thumbnail && req.files.thumbnail[0]) {
      const thumbFile = req.files.thumbnail[0];
      try {
        newThumbnailResult = await uploadStreamToCloudinary(thumbFile.buffer, 'image', 'stitch_agency/thumbnails');
        existingVideo.thumbnail = newThumbnailResult.secure_url;
        existingVideo.thumbnailPublicId = newThumbnailResult.public_id;
      } catch (uploadError) {
        // If thumbnail upload fails, clean up new video if it was uploaded
        if (newVideoResult && newVideoResult.public_id) {
          await deleteFromCloudinary(newVideoResult.public_id, 'video');
        }
        console.error('❌ Cloudinary Thumbnail Replacement Upload Error:', uploadError);
        return res.status(500).json({
          success: false,
          message: 'Failed to upload replacement thumbnail to Cloudinary.',
          error: uploadError.message,
        });
      }
    }

    // 4. Update text metadata if provided
    if (title !== undefined && title.trim()) {
      existingVideo.title = title.trim();
    }
    if (description !== undefined) {
      existingVideo.description = description.trim();
    }
    if (order !== undefined && order !== '') {
      existingVideo.order = Number(order);
    }

    // 5. Mongoose UPDATE: Save updated document
    let updatedVideo;
    try {
      updatedVideo = await existingVideo.save();
    } catch (dbError) {
      // If DB save fails, clean up newly uploaded assets to avoid orphans
      if (newVideoResult && newVideoResult.public_id) {
        await deleteFromCloudinary(newVideoResult.public_id, 'video');
      }
      if (newThumbnailResult && newThumbnailResult.public_id) {
        await deleteFromCloudinary(newThumbnailResult.public_id, 'image');
      }
      console.error('❌ Database Update Error:', dbError);
      return res.status(500).json({
        success: false,
        message: 'Failed to update video in database.',
        error: dbError.message,
      });
    }

    // 6. Delete old Cloudinary assets AFTER successful database save
    if (newVideoResult && oldVideoPublicId) {
      await deleteFromCloudinary(oldVideoPublicId, 'video');
    }
    if (newThumbnailResult && oldThumbnailPublicId) {
      await deleteFromCloudinary(oldThumbnailPublicId, 'image');
    }

    return res.status(200).json({
      success: true,
      message: 'Video updated successfully.',
      data: updatedVideo,
    });
  } catch (error) {
    if (newVideoResult && newVideoResult.public_id) {
      await deleteFromCloudinary(newVideoResult.public_id, 'video');
    }
    if (newThumbnailResult && newThumbnailResult.public_id) {
      await deleteFromCloudinary(newThumbnailResult.public_id, 'image');
    }
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

    // 1. Mongoose READ by ID: Find existing video first
    const existingVideo = await Video.findById(id);
    if (!existingVideo) {
      return res.status(404).json({
        success: false,
        message: 'Video not found.',
      });
    }

    // 2. Delete Cloudinary video asset safely using videoPublicId (if present)
    if (existingVideo.videoPublicId) {
      await deleteFromCloudinary(existingVideo.videoPublicId, 'video');
    }

    // 3. Delete Cloudinary thumbnail asset safely using thumbnailPublicId (if present)
    if (existingVideo.thumbnailPublicId) {
      await deleteFromCloudinary(existingVideo.thumbnailPublicId, 'image');
    }

    // 4. Mongoose DELETE: Remove document from MongoDB
    await Video.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: 'Video deleted successfully.',
      data: existingVideo,
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
