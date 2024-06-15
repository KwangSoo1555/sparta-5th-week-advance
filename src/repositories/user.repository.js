export class UserProfileRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findOneUser = async (userId) => {
    const user = await this.prisma.users.findUnique({
      where: { id: userId },
    });

    return user;
  };

  updateUser = async (userId, name, email, password, newPassword) => {
    const updatedUser = await this.prisma.users.update({
      where: { id: userId },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(newPassword && { password }),
        updatedAt: new Date(),
      },
    });

    return updatedUser;
  };

  checkUser = async (params) => {
    return await this.prisma.users.findFirst({
      where: params,
    });
  };
}
