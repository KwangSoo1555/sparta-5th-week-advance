import jwt from 'jsonwebtoken';

import { AUTH_CONSTANT } from '../constants/auth.constant.js';

export class JWT {
  static async generateAccessToken(userId) {
    return jwt.sign(
      { userId }, 
      AUTH_CONSTANT.ACCESS_TOKEN_SECRET_KEY, 
      { expiresIn: AUTH_CONSTANT.ACCESS_TOKEN_EXPIRED_IN }
    );
  }

  static async generateRefreshToken(userId) {
    return jwt.sign(
      { userId }, 
      AUTH_CONSTANT.REFRESH_TOKEN_SECRET_KEY, 
      { expiresIn: AUTH_CONSTANT.REFRESH_TOKEN_EXPIRED_IN }
    );
  }
}
