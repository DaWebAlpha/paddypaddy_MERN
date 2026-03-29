import mongoose from 'mongoose';
import createBaseModel from '../mongoose.base.model.js';

const PAYMENT_PURPOSES = [
  'promotion_payment',
  'service_payment',
  'product_payment',
  'subscription',
  'wallet_topup',
  'refund',
  'withdrawal',
  'other',
];

const PAYMENT_PROVIDERS = ['manual', 'paystack', 'flutterwave', 'stripe', 'wallet'];

const paymentTransactionDefinition = {
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },

  related_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
    index: true,
  },

  purpose: {
    type: String,
    enum: PAYMENT_PURPOSES,
    required: true,
    index: true,
  },

  direction: {
    type: String,
    enum: ['credit', 'debit'],
    required: true,
    index: true,
  },

  provider: {
    type: String,
    enum: PAYMENT_PROVIDERS,
    default: 'manual',
    index: true,
  },

  amount: {
    type: Number,
    required: true,
    min: 0,
  },

  currency: {
    type: String,
    trim: true,
    default: 'GHS',
    maxlength: 10,
  },

  status: {
    type: String,
    enum: ['pending', 'success', 'failed', 'cancelled', 'refunded'],
    default: 'pending',
    index: true,
  },

  reference: {
    type: String,
    trim: true,
    required: true,
  },

  external_reference: {
    type: String,
    trim: true,
    default: null,
    index: true,
  },

  narration: {
    type: String,
    trim: true,
    maxlength: 500,
    default: null,
  },

  payment_method: {
    type: String,
    trim: true,
    maxlength: 100,
    default: null,
  },

  paid_at: {
    type: Date,
    default: null,
    index: true,
  },

  related_model: {
    type: String,
    trim: true,
    default: null,
    index: true,
  },

  related_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    index: true,
  },

  provider_payload: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },

  meta: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
};

const PaymentTransaction = createBaseModel('PaymentTransaction', paymentTransactionDefinition, (schema) => {
  schema.index(
    { reference: 1 },
    { unique: true, partialFilterExpression: { is_deleted: false } }
  );

  schema.index({ user_id: 1, created_at: -1 });
  schema.index({ purpose: 1, status: 1, created_at: -1 });
  schema.index({ related_model: 1, related_id: 1 });
  schema.index({ provider: 1, status: 1, paid_at: -1 });

  schema.pre('validate', function (next) {
    if (this.external_reference === '') this.external_reference = null;
    if (this.narration === '') this.narration = null;
    if (this.payment_method === '') this.payment_method = null;
    if (this.related_model === '') this.related_model = null;
    next();
  });
});

export default PaymentTransaction;