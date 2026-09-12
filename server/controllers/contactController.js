const Contact = require('../models/Contact');

/**
 * ==========================================================
 * CONTACT CONTROLLER
 * ==========================================================
 * Handles all contact form submissions and admin enquiry management.
 * 
 * Public Routes:
 * 1. POST /api/contact           - Submit a new enquiry from website
 * 
 * Admin Protected Routes:
 * 2. GET    /api/contact         - Get all enquiries (sorted by newest first)
 * 3. GET    /api/contact/:id     - Get specific enquiry details
 * 4. PATCH  /api/contact/:id/status - Update enquiry status ('unread' | 'read' | 'contacted')
 * 5. DELETE /api/contact/:id     - Delete an enquiry
 */

/**
 * @desc    Submit a new contact enquiry (Public)
 * @route   POST /api/contact
 * @access  Public
 */
const submitContact = async (req, res) => {
  try {
    if (Contact.db.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database connection unavailable. Please try again in a few moments.',
      });
    }

    const { name, email, phone, subject, service, message } = req.body;

    // 1. Validation
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your name.',
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address format (e.g. name@domain.com).',
      });
    }

    if (!phone || !phone.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your phone number.',
      });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please enter your message.',
      });
    }

    // 2. Create and Save Document in MongoDB
    const newEnquiry = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      subject: subject ? subject.trim() : (service ? service.trim() : 'Website Inquiry'),
      service: service ? service.trim() : (subject ? subject.trim() : ''),
      message: message.trim(),
      status: 'unread',
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your enquiry has been received. Our team will contact you shortly.',
      data: newEnquiry,
    });
  } catch (error) {
    console.error('❌ Submit Contact Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit enquiry. Please try again.',
      error: error.message,
    });
  }
};

/**
 * @desc    Get all contact enquiries (Admin Protected)
 * @route   GET /api/contact
 * @access  Private (Admin only)
 */
const getContacts = async (req, res) => {
  try {
    if (Contact.db.readyState !== 1) {
      return res.status(200).json({
        success: true,
        count: 0,
        unreadCount: 0,
        data: [],
      });
    }

    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    const unreadCount = await Contact.countDocuments({ status: 'unread' });

    return res.status(200).json({
      success: true,
      count: contacts.length,
      unreadCount,
      data: contacts || [],
    });
  } catch (error) {
    console.error('❌ Get Contacts Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch contact enquiries.',
      error: error.message,
    });
  }
};

/**
 * @desc    Get single contact enquiry details (Admin Protected)
 * @route   GET /api/contact/:id
 * @access  Private (Admin only)
 */
const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found.',
      });
    }

    return res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error('❌ Get Contact by ID Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch enquiry details.',
      error: error.message,
    });
  }
};

/**
 * @desc    Update enquiry status (Admin Protected)
 * @route   PATCH /api/contact/:id/status
 * @access  Private (Admin only)
 */
const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['unread', 'read', 'contacted'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed values are: ${validStatuses.join(', ')}`,
      });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Enquiry status updated.',
      data: updatedContact,
    });
  } catch (error) {
    console.error('❌ Update Contact Status Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update enquiry status.',
      error: error.message,
    });
  }
};

/**
 * @desc    Delete an enquiry (Admin Protected)
 * @route   DELETE /api/contact/:id
 * @access  Private (Admin only)
 */
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Enquiry deleted successfully.',
      data: deletedContact,
    });
  } catch (error) {
    console.error('❌ Delete Contact Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete enquiry.',
      error: error.message,
    });
  }
};

module.exports = {
  submitContact,
  getContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
};
