import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { AUTH_CONSTANT } from '../constants/auth.constant.js';
import { RefreshTokenRepository } from '../repositories/refresh-token-reissue.repository.js';

export class GenerateToken {
  // access token issue
  static async accessToken(userId) {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '12h' });
  }

  // refresh token issue
  static async refreshToken(userId) {
    return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: '7d' });
  }

  // hashed refresh token store data base
  static storeRefreshToken = async (userId, refreshToken, ip, userAgent) => {
    const refreshTokenRepository = new RefreshTokenRepository();

    const hashedRefreshToken = await bcrypt.hash(refreshToken, AUTH_CONSTANT.HASH_SALT);

    return await refreshTokenRepository.refreshTokenReissue(
      userId,
      hashedRefreshToken,
      ip,
      userAgent
    );
  };
}
