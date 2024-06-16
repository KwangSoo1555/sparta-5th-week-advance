export class UserProfileService {
  constructor(userProfileRepository) {
    this.userProfileRepository = userProfileRepository;
  }

  findOneUser = async (userId) => {
    const user = await this.userProfileRepository.findOneUser(userId);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  };

  updateUser = async (userId, name, email, password, newPassword) => {
    const updatedUser = await this.userProfileRepository.updateUser(
      userId,
      name,
      email,
      password,
      newPassword
    );

    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      updatedAt: updatedUser.updatedAt,
    };
  };

  checkUser = async (params) => {
    return await this.userProfileRepository.checkUser(params);
  };
}
