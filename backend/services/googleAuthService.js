const { OAuth2Client } = require('google-auth-library');
const logger = require('../config/logger');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verifyGoogleToken = async (idToken) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      throw new Error('Invalid token payload or email missing');
    }

    if (!payload.email_verified) {
      throw new Error('Google email is not verified');
    }

    return {
      googleId: payload.sub,
      email: payload.email.toLowerCase(),
      name: payload.name || `${payload.given_name || ''} ${payload.family_name || ''}`.trim(),
      avatar: payload.picture || '',
      emailVerified: payload.email_verified,
    };
  } catch (err) {
    logger.error(`Google token verification failed: ${err.message}`);
    throw err;
  }
};

module.exports = {
  verifyGoogleToken,
};
