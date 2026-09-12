const express = require('express');
const router = express.Router();
const {
  submitContact,
  getContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
} = require('../controllers/contactController');
const requireAdminAuth = require('../middleware/auth');

/**
 * ==========================================================
 * CONTACT ENQUIRY API ROUTES
 * ==========================================================
 * 
 * Public Routes:
 * POST /api/contact               -> Submit enquiry from website
 * 
 * Protected Routes (Requires JWT Header: Authorization: Bearer <token>):
 * GET    /api/contact             -> Fetch all enquiries (Admin)
 * GET    /api/contact/:id         -> Fetch enquiry details (Admin)
 * PATCH  /api/contact/:id/status  -> Update status (Admin)
 * DELETE /api/contact/:id         -> Delete enquiry (Admin)
 */

// Public endpoint for contact form submission
router.post('/', submitContact);

// Protected Admin endpoints
router.get('/', requireAdminAuth, getContacts);
router.get('/:id', requireAdminAuth, getContactById);
router.patch('/:id/status', requireAdminAuth, updateContactStatus);
router.delete('/:id', requireAdminAuth, deleteContact);

module.exports = router;
