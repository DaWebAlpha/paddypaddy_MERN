import mongoose from 'mongoose';
import createBaseModel from '../mongoose.base.model.js';

const passwordResetTokenDefinition = {
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },

  token_hash: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },

  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    index: true,
  },

  expires_at: {
    type: Date,
    required: true,
    index: true,
  },

  used_at: {
    type: Date,
    default: null,
    index: true,
  },

  is_used: {
    type: Boolean,
    default: false,
    index: true,
  },

  requested_ip: {
    type: String,
    trim: true,
    default: null,
  },

  user_agent: {
    type: String,
    trim: true,
    default: null,
  },
};

const PasswordResetToken = createBaseModel('PasswordResetToken', passwordResetTokenDefinition, (schema) => {
  schema.index(
    { token_hash: 1 },
    { unique: true, partialFilterExpression: { is_deleted: false } }
  );

  schema.index({ user_id: 1, is_used: 1, expires_at: 1 });
  schema.index({ expires_at: 1 }, { expireAfterSeconds: 0 });

  schema.pre('validate', function (next) {
    if (this.requested_ip === '') this.requested_ip = null;
    if (this.user_agent === '') this.user_agent = null;
    next();
  });
});

export { PasswordResetToken };
export default PasswordResetToken;