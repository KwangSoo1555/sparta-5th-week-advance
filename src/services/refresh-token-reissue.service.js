export class RefreshTokenService {
  constructor(refreshTokenRepository) {
    this.refreshTokenRepository = refreshTokenRepository;
  }

  storeReIssueRefreshToken = async (userId, accessToken, refreshToken, hashedReIssueRefreshToken, ip, userAgent) => {
    const updatedRefreshToken = await this.refreshTokenRepository.storeReIssueRefreshToken(
      userId,
      hashedReIssueRefreshToken,
      ip, 
      userAgent
    );

    return {
      userId: updatedRefreshToken.userId,
      accessToken: accessToken, 
      refreshToken: refreshToken,
      ip: updatedRefreshToken.ip,
      userAgent: updatedRefreshToken.userAgent,
      createdAt: updatedRefreshToken.createdAt,
      updatedAt: updatedRefreshToken.updatedAt,
    };
  };

  checkRefreshToken = async (params) => {
    return await this.refreshTokenRepository.checkRefreshToken(params);
  };
}
