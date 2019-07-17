import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import config from '../config';

export default class TokenHelper {
  static generateToken(payload, duration) {
    return jwt.sign(payload, config.SECRET, { expiresIn: duration });
  }

  static generateCRCToken(crcToken) {
    const hmac = crypto.createHmac('sha256', config.TWITTER_API_SECRETE_KEY);

    hmac.update(crcToken);

    return hmac.digest('base64');
  }
}
