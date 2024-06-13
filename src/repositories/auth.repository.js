import { prisma } from '../utils/prisma.util.js';

export class AuthRepository {
  registerUser = async (name, email, password) => {
    const registeredUser = await prisma.users.create({
      data: {
        name,
        email,
        password,
      },
    });
    return registeredUser;
  };

  findUserByEmail = async (email) => {
    return await prisma.users.findFirst({
      where: { email },
    });
  };
}
