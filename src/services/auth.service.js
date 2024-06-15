import { AuthRepository } from '../repositories/auth.repository.js';

export class AuthService {
  authRepository = new AuthRepository();

  registerUser = async (name, email, password) => {
    const registeredUser = await this.authRepository.registerUser(
      name, 
      email, 
      password, 
    );

    return {
      id: registeredUser.id,
      name: registeredUser.name,
      email: registeredUser.email,
      role: registeredUser.role,
      createdAt: registeredUser.createdAt,
      updatedAt: registeredUser.updatedAt,
    };
  };

  findUserByEmail = async (email) => {
    return await this.authRepository.findUserByEmail(email);
  };
}
