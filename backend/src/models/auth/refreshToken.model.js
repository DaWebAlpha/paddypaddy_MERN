import crypto from 'crypto';
import mongoose from 'mongoose';
import createBaseModel from '../mongoose.base.model.js';

const refreshTokenDefinition = {
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  token_hash: {
    type: String,
    required: true,
    trim: true,
  },

  token_version: {
    type: Number,
    default: 0,
    min: 0,
  },

  device_id: {
    type: String,
    trim: true,
    required: true,
  },

  device_name: {
    type: String,
    trim: true,
    default: null,
    maxlength: 150,
  },

  user_agent: {
    type: String,
    trim: true,
    default: null,
    maxlength: 500,
  },

  ip_address: {
    type: String,
    trim: true,
    default: null,
    maxlength: 100,
  },

  expires_at: {
    type: Date,
    required: true,
  },

  last_used_at: {
    type: Date,
    default: Date.now,
  },

  revoked_at: {
    type: Date,
    default: null,
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
  },
};

const RefreshToken = createBaseModel(
  'RefreshToken',
  refreshTokenDefinition,
  (schema) => {
    /**
     * UNIQUE TOKEN HASH
     * Never store raw refresh tokens in the database.
     */
    schema.index(
      { token_hash: 1 },
      {
        unique: true,
        partialFilterExpression: { is_deleted: false },
      }
    );

    /**
     * FAST LOOKUP FOR ACTIVE TOKENS BY USER
     */
    schema.index({ user_id: 1, is_revoked: 1, expires_at: 1 });

    /**
     * ENFORCE ONLY ONE ACTIVE TOKEN PER USER + DEVICE
     *
     * This must be unique, otherwise it does not actually enforce anything.
     * We only enforce uniqueness for non-revoked and non-deleted records.
     */
    schema.index(
      { user_id: 1, device_id: 1 },
      {
        unique: true,
        partialFilterExpression: {
          is_revoked: false,
          is_deleted: false,
        },
      }
    );

    /**
     * TTL INDEX
     * MongoDB will automatically remove documents after expires_at.
     */
    schema.index({ expires_at: 1 }, { expireAfterSeconds: 0 });

    /**
     * HASH RAW TOKEN
     */
    schema.statics.hashToken = function (rawToken) {
      return crypto
        .createHash('sha256')
        .update(String(rawToken))
        .digest('hex');
    };

    /**
     * FIND ACTIVE TOKEN BY RAW TOKEN
     * Useful in refresh flow after client sends raw token.
     */
    schema.statics.findActiveByRawToken = function (rawToken) {
      const tokenHash = this.hashToken(rawToken);

      return this.findOne({
        token_hash: tokenHash,
        is_revoked: false,
        expires_at: { $gt: new Date() },
        is_deleted: false,
      });
    };

    /**
     * NORMALIZE EMPTY STRINGS TO NULL
     */
    schema.pre('validate', function (next) {
      const nullableFields = [
        'device_name',
        'user_agent',
        'ip_address',
        'revoke_reason',
      ];

      for (const field of nullableFields) {
        if (this[field] === '') {
          this[field] = null;
        }
      }

      next();
    });

    /**
     * BASIC DATE VALIDATION
     */
    schema.pre('validate', function (next) {
      if (this.expires_at && this.expires_at.getTime() <= Date.now()) {
        return next(new Error('expires_at must be a future date'));
      }

      next();
    });

    /**
     * REVOKE TOKEN
     * Idempotent: revoking an already revoked token should not keep changing data.
     */
    schema.methods.revoke = async function (reason = 'manual_revocation') {
      if (this.is_revoked) {
        return this;
      }

      this.is_revoked = true;
      this.revoked_at = new Date();
      this.revoke_reason = reason;
      return this.save({ validateBeforeSave: false });
    };

    /**
     * ROTATE TOKEN
     * Used during refresh flow.
     */
    schema.methods.rotate = async function ({
      newTokenHash,
      expiresAt,
      tokenVersion,
    }) {
      if (!newTokenHash) {
        throw new Error('newTokenHash is required');
      }

      if (!(expiresAt instanceof Date) || Number.isNaN(expiresAt.getTime())) {
        throw new Error('expiresAt must be a valid Date');
      }

      if (expiresAt.getTime() <= Date.now()) {
        throw new Error('expiresAt must be in the future');
      }

      this.token_hash = newTokenHash;
      this.expires_at = expiresAt;
      this.token_version =
        typeof tokenVersion === 'number'
          ? tokenVersion
          : (this.token_version || 0) + 1;
      this.last_used_at = new Date();
      this.is_revoked = false;
      this.revoked_at = null;
      this.revoke_reason = null;

      return this.save({ validateBeforeSave: false });
    };

    /**
     * CHECK WHETHER TOKEN IS ACTIVE
     */
    schema.methods.isActive = function () {
      return (
        !this.is_revoked &&
        this.expires_at instanceof Date &&
        this.expires_at.getTime() > Date.now()
      );
    };
  }
);

export { RefreshToken };
export default RefreshToken;