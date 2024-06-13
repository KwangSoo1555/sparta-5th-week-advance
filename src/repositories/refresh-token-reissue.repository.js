import { prisma } from '../utils/prisma.util.js';

export class RefreshTokenRepository {
  refreshTokenReissue = async (userId, refreshToken, ip, userAgent) => {
    const upsertRefreshToken = await prisma.refreshToken.upsert({
      where: { userId },
      update: {
        refreshToken,
        ip,
        userAgent,
        updatedAt: new Date(),
      },
      create: {
        userId,
        refreshToken,
        ip,
        userAgent,
      },
    });
    return upsertRefreshToken;
  };
}
