const jwt = require('jsonwebtoken');

/**
 * ==========================================================
 * JWT AUTHENTICATION MIDDLEWARE
 * ==========================================================
 * JWT (JSON Web Token) is used to verify the identity of the Admin.
 * When the admin logs in, a signed token is generated and returned.
 * The client sends this token in the `Authorization: Bearer <token>` header.
 * 
 * How this middleware works:
 * 1. Checks if the `Authorization` header exists and starts with "Bearer ".
 * 2. Extracts the token string.
 * 3. Verifies the token's validity using `jwt.verify()` and `process.env.JWT_SECRET`.
 * 4. If valid, attaches decoded user data to `req.user` and calls `next()`.
 * 5. If invalid or missing, rejects the request with HTTP 401 (Unauthorized).
 */
const requireAdminAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if Authorization header is provided with Bearer schema
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No authentication token provided.',
      });
    }

    // Extract the token after 'Bearer '
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Invalid token format.',
      });
    }

    // Verify token with secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_jwt_key_stitch_agency_2026');

    // Attach decoded user info to request object
    req.user = decoded;

    // Proceed to next controller / middleware
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authentication token. Please log in again.',
    });
  }
};

module.exports = requireAdminAuth;
