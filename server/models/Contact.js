const mongoose = require('mongoose');

/**
 * ==========================================================
 * CONTACT ENQUIRY MODEL & SCHEMA (MongoDB with Mongoose)
 * ==========================================================
 * Stores enquiries and messages submitted via the public Contact Us form.
 * 
 * Fields:
 * - name: Client's full name (Required)
 * - email: Client's email address (Required)
 * - phone: Client's contact phone number (Required)
 * - subject: Project subject or topic
 * - service: Service requested (e.g. Video Production, Ads, etc.)
 * - message: Detailed enquiry message (Required)
 * - status: 'unread' | 'read' | 'contacted' (Default: 'unread')
 * - createdAt: Timestamp of submission
 */
const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    subject: {
      type: String,
      trim: true,
      default: '',
    },
    service: {
      type: String,
      trim: true,
      default: '',
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['unread', 'read', 'contacted'],
      default: 'unread',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Contact', contactSchema);
