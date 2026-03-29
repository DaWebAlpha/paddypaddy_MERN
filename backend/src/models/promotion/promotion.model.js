import mongoose from 'mongoose';
import createBaseModel from '../mongoose.base.model.js';

const promotionDefinition = {
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },

  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 120,
  },

  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000,
  },

  service_category: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
    index: true,
  },

  budget: {
    type: Number,
    required: true,
    min: 0,
  },

  currency: {
    type: String,
    default: 'GHS',
    trim: true,
    maxlength: 10,
  },

  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'expired'],
    default: 'pending',
    index: true,
  },

  starts_at: {
    type: Date,
    default: Date.now,
    index: true,
  },

  ends_at: {
    type: Date,
    required: true,
    index: true,
  },

  contact_phone: {
    type: String,
    trim: true,
    default: null,
  },

  contact_email: {
    type: String,
    trim: true,
    default: null,
  },

  image_url: {
    type: String,
    trim: true,
    default: null,
  },
};

const Promotion = createBaseModel('Promotion', promotionDefinition, (schema) => {
  schema.index({ status: 1, starts_at: -1, ends_at: 1 });
  schema.index({ user_id: 1, created_at: -1 });
});

export { Promotion }
export default Promotion;