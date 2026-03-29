import crypto from 'crypto';
import mongoose from 'mongoose';
import createBaseModel from '../mongoose.base.model.js';

const emailVerificationTokenDefinition = {
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  token_hash: {
    type: String,
    required: true,
    index: true
  },
  purpose: {
    type: String,
    enum: ['email_verification'],
    default: 'email_verification',
    index: true
  },
  expires_at: {
    type: Date,
    required: true,
    index: true
  },
  used_at: {
    type: Date,
    default: null
  }
};

const EmailVerificationToken = createBaseModel(
  'EmailVerificationToken',
  emailVerificationTokenDefinition,
  (schema) => {
    schema.index({ user_id: 1, purpose: 1 });
    schema.index({ expires_at: 1 }, { expireAfterSeconds: 0 });

    schema.statics.hashToken = function (rawToken) {
      return crypto.createHash('sha256').update(String(rawToken)).digest('hex');
    };
  }
);

export { EmailVerificationToken };
export default EmailVerificationToken;
