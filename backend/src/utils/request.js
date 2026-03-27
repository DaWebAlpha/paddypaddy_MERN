export const getClientIP = (req) => {
  return (
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers['x-real-ip'] ||
    req.socket?.remoteAddress ||
    req.ip ||
    'unknown'
  );
};

export const getUserAgent = (req) => {
  return req.headers['user-agent'] || null;
};


export const getDeviceName = (req) => {
  const raw =
    req.body?.device_name ||
    req.headers['x-device-name'] ||
    req.headers['device-name'] ||
    '';

  return String(raw || '').trim();
};

export const getDeviceId = (req) => {
  const raw =
    req.body?.device_id ||
    req.headers['x-device-id'] ||
    req.headers['device-id'] ||
    '';

  return String(raw || '').trim() || crypto.randomUUID();
};


export default {
  getClientIP,
  getUserAgent,
  getDeviceName,
  getDeviceId,
};