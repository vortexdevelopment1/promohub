const jwt = require('jsonwebtoken');

/**
 * ==========================================================
 * ADMIN AUTH CONTROLLER
 * ==========================================================
 * Single Admin Login:
 * There is NO registration system. Admin credentials are configured in `.env`.
 * 
 * Flow:
 * 1. Admin submits email & password from the frontend login form.
 * 2. Compares submitted credentials with process.env.ADMIN_EMAIL and process.env.ADMIN_PASSWORD.
 * 3. If matching, generates a signed JWT token valid for 7 days.
 * 4. Returns token and admin details to the client.
 */
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request body
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
      });
    }

    const envAdminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const envAdminPassword = process.env.ADMIN_PASSWORD || '123456';

    // Verify credentials
    if (email.trim().toLowerCase() !== envAdminEmail.trim().toLowerCase() || password !== envAdminPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        email: envAdminEmail,
        role: 'admin',
      },
      process.env.JWT_SECRET || 'super_secret_jwt_key_stitch_agency_2026',
      {
        expiresIn: '7d', // Token remains valid for 7 days
      }
    );

    return res.status(200).json({
      success: true,
      message: 'Admin login successful.',
      token: token,
      admin: {
        email: envAdminEmail,
        role: 'admin',
      },
    });
  } catch (error) {
    console.error('❌ Admin Login Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during authentication.',
      error: error.message,
    });
  }
};

module.exports = {
  adminLogin,
};
