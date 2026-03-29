import mongoose from 'mongoose';
import createBaseModel from '../mongoose.base.model.js';

const promotionPaymentDefinition = {
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },

  promotion_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Promotion',
    required: true,
    index: true,
  },

  promotion_period: {
    type: String,
    enum: ['one_day', 'three_days', 'one_week', 'two_weeks', 'one_month', 'three_months', 'six_months', 'one_year'],
    default: 'one_month',
    index: true,
  },

  amount: {
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

  provider: {
    type: String,
    enum: ['manual', 'paystack', 'flutterwave'],
    default: 'manual',
    index: true,
  },

  status: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending',
    index: true,
  },

  reference: {
    type: String,
    required: true,
    trim: true,
  },

  paid_at: {
    type: Date,
    default: null,
  },

  provider_payload: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
};

const PromotionPayment = createBaseModel('PromotionPayment', promotionPaymentDefinition, (schema) => {
  schema.index(
    { reference: 1 },
    { unique: true, partialFilterExpression: { is_deleted: false } }
  );

  schema.index({ promotion_id: 1, created_at: -1 });
  schema.index({ user_id: 1, created_at: -1 });
  schema.index({ status: 1, created_at: -1 });
});

export default PromotionPayment;