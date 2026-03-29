
import createBaseModel from '../mongoose.base.model.js';
import validator from 'validator';
import { hashPassword, verifyPassword } from '../../utils/password.argon2.js';
import { normalizeValue, RESERVED_WORDS } from '../../utils/string.utils.js';
import  BadRequestError  from "../../errors/bad-request.error.js";

const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME_MS = 30 * 60 * 1000;
const MAX_FAILED_LOGIN_LOGS = 10;
const ACCOUNT_WARNING_LIMIT = 5;

const USERNAME_REGEX = /^(?=.{3,20}$)[A-Za-z0-9]+(?:[_.-][A-Za-z0-9]+)*$/
const PASSWORD_REGEX = /^(?=.{8,120}$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^\w\s])$/

const failedLoginLogSchema = {
  _id: false,
  ip_address: {
    type: String,
    required: true,
    trim: true,
    maxlength: [100, 'IP address is too long']
  },
  user_agent: {
    type: String,
    default: null,
    trim: true,
    maxlength: [500, 'User agent is too long']
  },
  attempted_at: {
    type: Date,
    default: Date.now
  },
  reason: {
    type: String,
    default: 'invalid_password',
    trim: true,
    maxlength: [100, 'Reason is too long']
  }
};

const userSchemaDefinition = {
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    lowercase: true,
    minlength: [3, "Username is too short"],
    maxlength: [20, "Username is too long"],
    match: [
      USERNAME_REGEX,
      "Username must be 3–20 characters long, start/end with a letter or number, and can only contain single underscores, dots, or hyphens in between."
    ],
    validate: {
      validator: function (val) {
        return !RESERVED_WORDS.has(normalizeValue(String(val || '')));
      },
      message: function (props) {
        return `${props.value} is a reserved word and cannot be used`;
      }
    }
  },

  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    minlength: [5, 'Email is too short'],
    maxlength: [120, 'Email is too long'],
    validate: {
      validator: function (val) {
        return validator.isEmail(normalizeValue(String(val || '')));
      },
      message: 'Enter a valid email'
    }
  },

  password: {
    type: String,
    default: null,
    trim: true,
    select: false,
    minlength: [8, 'Password is too short'],
    maxlength: [120, 'Password is too long'],
    
    validate: {
        validator: function (val) {
        if (this.auth_provider === 'google' && !val) return true;
        if (!this.isModified('password')) return true;        
        return PASSWORD_REGEX.test(String(val || ''));
      },
      message: 'Password must contain uppercase, lowercase, number, and special character' 
    }
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
  auth_provider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local',
    index: true
  },

  google_sub: {
    type: String,
    default: null,
    
  },

  avatar_url: {
    type: String,
    trim: true,
    default: null
  },

  role: {
    type: String,
    enum: ['user', 'moderator', 'admin', 'superAdmin'],
    default: 'user',
    index: true
  },

  account_type: {
    type: String,
    enum: ['customer', 'provider', 'both'],
    default: 'customer',
    index: true
  },

  onboarding_completed: {
    type: Boolean,
    default: false,
    index: true
  },

  token_version: {
    type: Number,
    default: 0,
    min: 0
  },

  is_email_verified: {
    type: Boolean,
    default: false,
    index: true
  },

  is_private: {
    type: Boolean,
    default: false,
    index: true
  },

  account_status: {
    type: String,
    enum: ['pending', 'active', 'suspended', 'banned'],
    default: 'pending',
    index: true
  },

  account_ban_warning: {
    type: Number,
    default: 0,
    min: 0
  },

  account_banned: {
    type: Boolean,
    default: false,
    index: true
  },

  times_account_banned: {
    type: Number,
    default: 0,
    min: 0,
    index: true
  },

  banned_until: {
    type: Date,
    default: null,
    index: true
  },

  last_password_changed_at: {
    type: Date,
    default: null
  },

  login_attempts: {
    type: Number,
    default: 0,
    required: true,
    min: 0
  },

  lock_until: {
    type: Date,
    default: null,
    index: true
  },

  last_login_at: {
    type: Date,
    default: null,
    index: true
  },

  failed_login_log: [failedLoginLogSchema],

  admin_comments: {
    type: String,
    trim: true,
    maxlength: [1000, 'Admin comments are too long'],
    default: null
  }
};

const User = createBaseModel('User', userSchemaDefinition, (schema) => {
  schema.index(
    { email: 1 },
    { unique: true, partialFilterExpression: { is_deleted: false } }
  );

  schema.index(
    { username: 1 },
    { unique: true, partialFilterExpression: { is_deleted: false } }
  );

  schema.index(
    { google_sub: 1 },
    {
      unique: true,
      sparse: true,
      partialFilterExpression: {
        is_deleted: false,
        google_sub: { $exists: true, $type: 'string', $ne: '' }
      }
    }
  );

  schema.index({ role: 1, account_status: 1 });
  schema.index({ account_type: 1, onboarding_completed: 1 });
  schema.index({ created_at: -1 });
  schema.index({ updated_at: -1 });
  schema.index({ is_deleted: 1, deleted_at: 1 });

  schema.virtual('is_locked').get(function () {
    return Boolean(this.lock_until && this.lock_until.getTime() > Date.now());
  });

  schema.virtual('is_temporarily_banned').get(function () {
    return Boolean(this.banned_until && this.banned_until.getTime() > Date.now());
  });

  schema.pre('save', async function (next) {
    try {
      if (this.isModified('username')) {
        this.username = String(this.username || '');
      }

      if (this.isModified('email')) {
        this.email = String(this.email || '');
      }

      if (this.isModified('password') && this.password) {
        this.password = await hashPassword(this.password);
        this.last_password_changed_at = new Date();
        this.token_version = Number(this.token_version || 0) + 1;
      }

      if (Array.isArray(this.failed_login_log) && this.failed_login_log.length > MAX_FAILED_LOGIN_LOGS) {
        this.failed_login_log = this.failed_login_log.slice(-MAX_FAILED_LOGIN_LOGS);
      }

      next();
    } catch (error) {
      next(error);
    }
  });

  schema.methods.comparePassword = async function (plainPassword) {
    if (!this.password) {
      throw new BadRequestError('Password field not found. Ensure you used .select("+password") in your query.');
    }
    return await verifyPassword(plainPassword, this.password);
  };


  schema.methods.recordFailedLogin = async function ({
    ip_address,
    user_agent = null,
    reason = 'invalid_password'
  } = {}) {
    this.login_attempts = Number(this.login_attempts || 0) + 1;

    this.failed_login_log.push({
      ip_address: ip_address || 'unknown',
      user_agent,
      reason,
      attempted_at: new Date()
    });

    if (this.failed_login_log.length > MAX_FAILED_LOGIN_LOGS) {
      this.failed_login_log = this.failed_login_log.slice(-MAX_FAILED_LOGIN_LOGS);
    }

    if (this.login_attempts >= MAX_LOGIN_ATTEMPTS) {
      this.lock_until = new Date(Date.now() + LOCK_TIME_MS);
    }

    return this.save({ validateBeforeSave: false });
  };

  schema.methods.clearLoginFailures = async function () {
    this.login_attempts = 0;
    this.lock_until = null;
    return this.save({ validateBeforeSave: false });
  };

  schema.methods.incrementBanWarning = async function () {
    this.account_ban_warning = Number(this.account_ban_warning || 0) + 1;
    return this.save({ validateBeforeSave: false });
  };

  schema.methods.suspendAccount = async function (durationMs = null, userId = null) {
    this.account_banned = true;
    this.account_status = 'suspended';
    this.updated_by = userId;
    this.times_account_banned = Number(this.times_account_banned || 0) + 1;
    this.banned_until = durationMs ? new Date(Date.now() + durationMs) : null;
    return this.save({ validateBeforeSave: false });
  };

  schema.methods.enforceBanPolicy = async function () {
    if (Number(this.account_ban_warning || 0) >= ACCOUNT_WARNING_LIMIT) {
      this.account_banned = true;
      this.account_status = 'suspended';
      this.times_account_banned = Number(this.times_account_banned || 0) + 1;
      this.banned_until = new Date(Date.now() + LOCK_TIME_MS);
      return this.save({ validateBeforeSave: false });
    }

    return this;
  };

  schema.methods.restoreSuspendedAccount = async function () {
    const stillBanned = this.banned_until && this.banned_until.getTime() > Date.now();

    if (stillBanned) {
      throw new Error('Account is still under suspension');
    }

    this.account_banned = false;
    this.account_status = 'active';
    this.account_ban_warning = 0;
    this.banned_until = null;

    return this.save({ validateBeforeSave: false });
  };
});

export { User };
export default User;
