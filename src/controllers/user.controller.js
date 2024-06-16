import bcrypt from 'bcrypt';

import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import { AUTH_CONSTANT } from '../constants/auth.constant.js';

export class UserProfileController {
  constructor(userProfileService) {
    this.userProfileService = userProfileService;
  }

  getUserProfile = async (req, res, next) => {
    try {
      const user = req.user;

      const findUser = await this.userProfileService.findOneUser(user.id);

      if (!user) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          status: HTTP_STATUS.NOT_FOUND,
          // message: 사용자 정보를 찾을 수 없습니다.,
        });
      }

      return res.status(HTTP_STATUS.OK).json({ data: findUser });
    } catch (error) {
      next(error);
    }
  };

  updateUserProfile = async (req, res, next) => {
    try {
      const user = req.user;
      const userId = +req.params.userId;
      const { name, email, currentPassword, newPassword } = req.body;

      if (name) {
        const findUserByName = await this.userProfileService.checkUser({ name });
        if (findUserByName) {
          return res.status(HTTP_STATUS.CONFLICT).json({
            status: HTTP_STATUS.CONFLICT,
            // message: 이미 존재하는 이름입니다.,
          });
        }
      }

      if (email) {
        const findUserByEmail = await this.userProfileService.checkUser({ email });
        if (findUserByEmail) {
          return res.status(HTTP_STATUS.CONFLICT).json({
            status: HTTP_STATUS.CONFLICT,
            // message: 이미 존재하는 이메일입니다.,
          });
        }
      }

      const findUser = await this.userProfileService.checkUser({ id: userId });

      if (newPassword) {
        const match = await bcrypt.compare(currentPassword, findUser.password);

        if (!currentPassword) {
          return res.status(HTTP_STATUS.BAD_REQUEST).json({
            status: HTTP_STATUS.BAD_REQUEST,
            // message: 현재 비밀번호를 입력하세요.
          });
        }

        if (!match) {
          return res.status(HTTP_STATUS.UNAUTHORIZED).json({
            status: HTTP_STATUS.UNAUTHORIZED,
            message: "입력한 비밀번호가 틀립니다."
          });
        }

        if (currentPassword === newPassword) {
          return res.status(HTTP_STATUS.BAD_REQUEST).json({
            status: HTTP_STATUS.BAD_REQUEST,
            // message: "기존 비밀번호가 아닌 다른 비밀번호를 입력하세요."
          });
        }

        findUser.password = await bcrypt.hash(newPassword, AUTH_CONSTANT.HASH_SALT);
      }

      if (!user || !findUser || findUser.id !== userId) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          status: HTTP_STATUS.NOT_FOUND,
          // message: 사용자를 찾을 수 없습니다.
        });
      }

      const updatedUser = await this.userProfileService.updateUser(
        userId,
        name,
        email,
        findUser.password,
        newPassword
      );

      updatedUser.newPasswrod = undefined;

      return res.status(HTTP_STATUS.OK).json({ data: updatedUser });
    } catch (error) {
      next(error);
    }
  };
}
