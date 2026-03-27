import { OAuth2Client } from 'google-auth-library';
import config from '../config/config.js';

const client = new OAuth2Client(config.google_client_id);

export const verifyGoogleIdToken = async (idToken) => {
  if (!idToken) {
    throw new Error('Google ID token is required');
  }

  const ticket = await client.verifyIdToken({
    idToken,
    audience: config.google_client_id,
  });

  const payload = ticket.getPayload();

  if (!payload) {
    throw new Error('Invalid Google token');
  }

  return {
    google_sub: payload.sub,
    email: String(payload.email || '').trim().toLowerCase(),
    email_verified: Boolean(payload.email_verified),
    full_name: payload.name || '',
    first_name: payload.given_name || '',
    last_name: payload.family_name || '',
    picture: payload.picture || null,
  };
};

export default {
  verifyGoogleIdToken,
};