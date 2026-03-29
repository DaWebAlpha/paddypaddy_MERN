import config from '../config/config.js';

const NODE_ENV = config?.node_env ?? 'development';
const AUTHORIZED_ROLES = new Set(['admin', 'superAdmin', 'moderator']);

const securityTransform = (_doc, ret, options = {}) => {
  const userRole = options.role ?? 'guest';

  delete ret.__version;
  delete ret._id;
  delete ret.password;
  delete ret.password_hash;
  delete ret.token_hash;

  if (!AUTHORIZED_ROLES.has(userRole)) {
    delete ret.admin_comments;
  }

  return ret;
};

const baseOptions = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  strict: true,
  strictQuery: true,
  versionKey: '__version',
  autoIndex: NODE_ENV !== 'production',
  optimisticConcurrency: true,
  toJSON: {
    virtuals: true,
    getters: true,
    transform: securityTransform,
  },
  toObject: {
    virtuals: true,
    getters: true,
    transform: securityTransform,
  },
  id: true,
};

export default baseOptions;