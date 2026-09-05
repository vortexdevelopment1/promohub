const express = require('express');
const router = express.Router();
const { adminLogin } = require('../controllers/authController');

/**
 * ==========================================================
 * ADMIN AUTHENTICATION ROUTES
 * ==========================================================
 * POST /api/admin/login -> Verifies admin credentials and returns JWT
 */
router.post('/login', adminLogin);

module.exports = router;
