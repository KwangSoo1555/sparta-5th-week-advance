import { RefreshTokenRepository } from '../repositories/refresh-token-reissue.repository.js';

export class RefreshTokenService {
  refreshTokenRepository = new RefreshTokenRepository();

  refreshTokenReissue = async (userId, refreshToken, ip, userAgent) => {
    const upsertRefreshToken = await this.refreshTokenRepository.refreshTokenReissue(
      userId,
      refreshToken,
      ip,
      userAgent
    );

    return {
      id: upsertRefreshToken.id,
      userId: upsertRefreshToken.userId,
      refreshToken: upsertRefreshToken.refreshToken,
      ip: upsertRefreshToken.ip,
      userAgent: upsertRefreshToken.userAgent,
      createdAt: upsertRefreshToken.createdAt,
      updatedAt: upsertRefreshToken.updatedAt,
    };
  };
}
