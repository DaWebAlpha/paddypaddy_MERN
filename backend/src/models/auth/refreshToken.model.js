import crypto from 'crypto';
import mongoose from 'mongoose';
import createBaseModel from '../mongoose.base.model.js';

const refreshTokenDefinition = {
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

  token_version: {
    type: Number,
    default: 0,
    min: 0,
    index: true,
  },

  device_id: {
    type: String,
    trim: true,
    required: true,
    index: true,
  },

  device_name: {
    type: String,
    trim: true,
    default: null,
  },

  user_agent: {
    type: String,
    trim: true,
    default: null,
  },

  ip_address: {
    type: String,
    trim: true,
    default: null,
  },

  expires_at: {
    type: Date,
    required: true,
    index: true,
  },

  last_used_at: {
    type: Date,
    default: Date.now,
    index: true,
  },

  revoked_at: {
    type: Date,
    default: null,
    index: true,
  },

  revoke_reason: {
    type: String,
    trim: true,
    maxlength: 200,
    default: null,
  },

  is_revoked: {
    type: Boolean,
    default: false,
    index: true,
  },
};

const RefreshToken = createBaseModel(
  'RefreshToken',
  refreshTokenDefinition,
  (schema) => {

    // 🔐 UNIQUE TOKEN HASH (secure storage)
    schema.index(
      { token_hash: 1 },
      { unique: true, partialFilterExpression: { is_deleted: false } }
    );

    // 🔍 FAST LOOKUPS FOR ACTIVE TOKENS
    schema.index({ user_id: 1, is_revoked: 1, expires_at: 1 });

    // 📱 ONE ACTIVE TOKEN PER DEVICE
    schema.index({ user_id: 1, device_id: 1, is_revoked: 1 });

    // ⏳ AUTO DELETE EXPIRED TOKENS
    schema.index({ expires_at: 1 }, { expireAfterSeconds: 0 });

    // 🔐 HASH RAW TOKEN (NEVER STORE RAW TOKEN)
    schema.statics.hashToken = function (rawToken) {
      return crypto
        .createHash('sha256')
        .update(String(rawToken))
        .digest('hex');
    };

    // 🧹 CLEAN EMPTY STRINGS
    schema.pre('validate', function (next) {
      if (this.device_name === '') this.device_name = null;
      if (this.user_agent === '') this.user_agent = null;
      if (this.ip_address === '') this.ip_address = null;
      if (this.revoke_reason === '') this.revoke_reason = null;
      next();
    });

    // 🔄 HELPER: REVOKE TOKEN
    schema.methods.revoke = async function (reason = 'manual_revocation') {
      this.is_revoked = true;
      this.revoked_at = new Date();
      this.revoke_reason = reason;
      return this.save({ validateBeforeSave: false });
    };

    // 🔄 HELPER: ROTATE TOKEN (USED IN REFRESH FLOW)
    schema.methods.rotate = async function ({
      newTokenHash,
      expiresAt,
      tokenVersion,
    }) {
      this.token_hash = newTokenHash;
      this.expires_at = expiresAt;
      this.token_version = tokenVersion;
      this.last_used_at = new Date();
      return this.save({ validateBeforeSave: false });
    };

    // 🔍 HELPER: CHECK IF TOKEN IS ACTIVE
    schema.methods.isActive = function () {
      return (
        !this.is_revoked &&
        this.expires_at &&
        this.expires_at.getTime() > Date.now()
      );
    };
  }
);

export { RefreshToken };
export default RefreshToken;