/**
 * Normalizes string by removing accents/diacritics.
 * Example: 'Café' -> 'Cafe'
 */
export const normalizeString = (val) => {
  if (typeof val !== 'string') return val;
  return val.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};


/**
 * Cleans name: trims and collapses multiple spaces.
 */
export const cleanValue = (val) => {
  if (typeof val !== 'string') return val;
  return val.trim().replace(/\s+/g, ' ');
};



// Remove trailing white spaces and returns lowercase of the string
export const normalizeValue = (val) => {
    if(typeof val !== 'string') return val;
    return val.trim().toLowerCase();
}


/**
 * Title case: "greater accra" -> "Greater Accra"
 * Best for categories, regions, constituencies, etc.
 */

export const formatTitle = (val) => {
  if (typeof val !== 'string') return val;
  return cleanValue(val)
    .split(' ')
    .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : w))
    .join(' ');
};
 


/**
 * Slug: removes accents, lowercases, removes symbols, spaces -> hyphens.
 */
export const formatSlug = (val) => {
  if (typeof val !== 'string') return val;
  return normalizeString(val)
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Update payload helper for findOneAndUpdate hooks
 */
export const getUpdateData = (update) => {
  const u = update || {};
  const data = u.$set || u;
  return { update: u, data };
};

export const hasOwn = (obj, key) =>
  Object.prototype.hasOwnProperty.call(obj, key);




export const RESERVED_WORDS = new Set([
  'admin', 'administrator', 'root', 'system', 'sysadmin', 'superuser',
  'owner', 'master', 'operator', 'dbadmin', 'postmaster', 'hostmaster',
  'support', 'help', 'helpdesk', 'service', 'info', 'contact', 'security',
  'verify', 'verification', 'audit', 'compliance', 'moderator', 'staff',
  'team', 'official', 'billing', 'accounts',
  'api', 'localhost', 'null', 'undefined', 'anonymous', 'guest', 'bot',
  'robot', 'crawler', 'proxy', 'test', 'tester', 'dev', 'developer',
  'staging', 'production', 'internal',
  'legal', 'privacy', 'terms', 'policy', 'tos', 'abuse', 'copyright',
  'trademark', 'claim', 'refund'
]);


