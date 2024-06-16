export class AuthService {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }
  registerUser = async (name, email, password) => {
    const registeredUser = await this.authRepository.registerUser(
      name, 
      email, 
      password
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

  logInUser = async (id, name, email, accessToken, refreshToken) => {
    return {
      id, 
      name,
      email,
      accessToken,
      refreshToken,
    };
  };

  storeRefreshToken = async (userId, refreshToken, ip, userAgent) => {
    return await this.authRepository.storeRefreshToken(
      userId, 
      refreshToken, 
      ip, 
      userAgent
    );
  };

  checkAuthUser = async (params) => {
    return await this.authRepository.checkAuthUser(params);
  };
}
