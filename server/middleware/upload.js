const multer = require('multer');

/**
 * ==========================================================
 * MULTER FILE UPLOAD MIDDLEWARE
 * ==========================================================
 * Multer parses `multipart/form-data` requests (used when uploading files like videos & images).
 * 
 * We use `multer.memoryStorage()`:
 * - Files are held in memory as Buffers (`req.files.video[0].buffer`), NOT written to local disk.
 * - This prevents cluttering server storage and is ideal for piping directly to Cloudinary.
 * 
 * Limits:
 * - File size limit: 100MB max (sufficient for portfolio reels/video clips)
 */
const storage = multer.memoryStorage();

// File filter to ensure only valid video types are uploaded
const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'video') {
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Video field only accepts video files (e.g. mp4, webm, mov).'), false);
    }
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100 MB maximum file size
  },
  fileFilter: fileFilter,
});

// Middleware configured to accept a 'video' file
const uploadVideoFiles = upload.fields([
  { name: 'video', maxCount: 1 },
]);

module.exports = uploadVideoFiles;
