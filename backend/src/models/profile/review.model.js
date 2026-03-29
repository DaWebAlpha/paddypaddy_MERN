import mongoose from 'mongoose';
import createBaseModel from '../mongoose.base.model.js';

const reviewDefinition = {
  provider_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },

  customer_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },

  provider_profile_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProviderProfile',
    required: true,
    index: true,
  },

  customer_profile_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CustomerProfile',
    required: true,
    index: true,
  },

  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    index: true,
  },

  title: {
    type: String,
    trim: true,
    maxlength: 120,
    default: null,
  },

  comment: {
    type: String,
    trim: true,
    maxlength: 1500,
    default: null,
  },

  is_visible: {
    type: Boolean,
    default: true,
    index: true,
  },

  is_verified_purchase: {
    type: Boolean,
    default: false,
    index: true,
  },

  moderation_status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'approved',
    index: true,
  },

  provider_reply: {
    type: String,
    trim: true,
    maxlength: 1000,
    default: null,
  },

  provider_replied_at: {
    type: Date,
    default: null,
  },
};

const Review = createBaseModel('Review', reviewDefinition, (schema) => {
  schema.index(
    { provider_user_id: 1, customer_user_id: 1 },
    { unique: true, partialFilterExpression: { is_deleted: false } }
  );

  schema.index({ provider_profile_id: 1, moderation_status: 1, is_visible: 1, created_at: -1 });
  schema.index({ customer_user_id: 1, created_at: -1 });
  schema.index({ provider_user_id: 1, rating: -1, created_at: -1 });

  schema.pre('validate', function (next) {
    if (this.title === '') this.title = null;
    if (this.comment === '') this.comment = null;
    if (this.provider_reply === '') this.provider_reply = null;
    next();
  });
});

export default Review;