import jwt from 'jsonwebtoken';
import config from '../config';

export default class TokenHelper {
  static generateToken(payload, duration) {
    return jwt.sign(payload, config.SECRET, { expiresIn: duration });
  }
}
