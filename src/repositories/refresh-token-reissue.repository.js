export class RefreshTokenRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  storeReIssueRefreshToken = async (userId, hashedReIssueRefreshToken, ip, userAgent) => {
    const upsertRefreshToken = await this.prisma.refreshToken.update({
      where: { userId },
      data: {
        refreshToken: hashedReIssueRefreshToken,
        ip, 
        userAgent, 
        updatedAt: new Date(),
      },
    });

    return upsertRefreshToken;
  };

  checkRefreshToken = async (params) => {
    return await this.prisma.refreshToken.findFirst({
      where: params,
    });
  };
}
