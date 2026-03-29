import mongoose from 'mongoose';
import createBaseModel from '../mongoose.base.model.js';

const REPORT_TARGET_TYPES = [
  'user',
  'provider_profile',
  'customer_profile',
  'service',
  'product',
  'message',
  'conversation',
  'review',
  'promotion',
  'gallery_item',
];

const REPORT_REASONS = [
  'spam',
  'fraud',
  'harassment',
  'hate_speech',
  'nudity',
  'violence',
  'scam',
  'fake_account',
  'impersonation',
  'copyright',
  'misinformation',
  'other',
];

const abuseReportDefinition = {
  reporter_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },

  target_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
    index: true,
  },

  target_type: {
    type: String,
    enum: REPORT_TARGET_TYPES,
    required: true,
    index: true,
  },

  target_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
  },

  reason: {
    type: String,
    enum: REPORT_REASONS,
    required: true,
    index: true,
  },

  details: {
    type: String,
    trim: true,
    maxlength: 2000,
    default: null,
  },

  evidence_urls: {
    type: [String],
    default: [],
  },

  status: {
    type: String,
    enum: ['pending', 'under_review', 'resolved', 'rejected'],
    default: 'pending',
    index: true,
  },

  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium',
    index: true,
  },

  admin_note: {
    type: String,
    trim: true,
    maxlength: 2000,
    default: null,
  },

  reviewed_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
    index: true,
  },

  reviewed_at: {
    type: Date,
    default: null,
    index: true,
  },

  action_taken: {
    type: String,
    trim: true,
    maxlength: 500,
    default: null,
  },
};

const AbuseReport = createBaseModel('AbuseReport', abuseReportDefinition, (schema) => {
  schema.index({ target_type: 1, target_id: 1, status: 1, created_at: -1 });
  schema.index({ reporter_user_id: 1, created_at: -1 });
  schema.index({ status: 1, priority: 1, created_at: -1 });

  schema.pre('validate', function (next) {
    if (Array.isArray(this.evidence_urls)) {
      this.evidence_urls = [...new Set(this.evidence_urls.map((v) => String(v).trim()).filter(Boolean))];
    }

    if (this.details === '') this.details = null;
    if (this.admin_note === '') this.admin_note = null;
    if (this.action_taken === '') this.action_taken = null;

    next();
  });
});

export default AbuseReport;