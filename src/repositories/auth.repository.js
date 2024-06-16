export class AuthRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  registerUser = async (name, email, password) => {
    const registeredUser = await this.prisma.users.create({
      data: {
        name,
        email,
        password,
      },
    });
    
    return registeredUser;
  };

  storeRefreshToken = async (userId, refreshToken, ip, userAgent) => {
    await this.prisma.refreshToken.upsert({
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
  };

  checkAuthUser = async (params) => {
    return await this.prisma.users.findFirst({
      where: params,
    });
  };
}
