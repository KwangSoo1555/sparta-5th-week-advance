import bcrypt from 'bcrypt';

import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import { AUTH_CONSTANT } from '../constants/auth.constant.js';
import { AuthService } from '../services/auth.service.js';
import { JWT } from '../utils/generate-token.util.js';

export class AuthController {
  authService = new AuthService();

  signupUser = async (req, res, next) => {
    try {
      const { name, email, password, passwordCheck } = req.body;

      if (!passwordCheck) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          status: HTTP_STATUS.BAD_REQUEST,
          // message: 비밀번호를 입력하세요
        });
      }

      if (password !== passwordCheck) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          status: HTTP_STATUS.BAD_REQUEST,
          // message: 비밀번호가 일치하지 않습니다.
        });
      }

      const findUserByEmail = await this.authService.findUserByEmail(email);

      if (findUserByEmail) {
        const isExistEmail = findUserByEmail.email;
        const isExistName = findUserByEmail.name;

        if (isExistEmail) {
          return res.status(HTTP_STATUS.CONFLICT).json({
            status: HTTP_STATUS.CONFLICT,
            // message: 이미 존재하는 이메일입니다.
          });
        }

        if (isExistName) {
          return res.status(HTTP_STATUS.CONFLICT).json({
            status: HTTP_STATUS.CONFLICT,
            // message: 이미 존재하는 이름입니다.
          });
        }
      }

      const hashedPW = await bcrypt.hash(password, AUTH_CONSTANT.HASH_SALT);

      const registeredUser = await this.authService.registerUser(name, email, hashedPW);

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        data: registeredUser,
      });
    } catch (error) {
      next(error);
    }
  };

  loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const findUserByEmail = await this.authService.findUserByEmail(email);
      const isExistEmail = findUserByEmail.email;

      if (!isExistEmail) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          status: HTTP_STATUS.UNAUTHORIZED,
          // message: 존재하지 않는 이메일입니다.
        });
      }

      const matchPW = await bcrypt.compare(password, findUserByEmail.password);
      if (!matchPW) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          status: HTTP_STATUS.UNAUTHORIZED,
          // message: 비밀번호가 일치하지 않습니다.
        });
      }

      // Generate JWT and return it in the response.
      const signedAccessToken = await JWT.generateAccessToken(findUserByEmail.id);
      const signedRefreshToken = await JWT.generateRefreshToken(findUserByEmail.id);

      // Store refresh token in the database
      await JWT.storeRefreshToken(
        findUserByEmail.id,
        signedRefreshToken,
        req.ip,
        req.get('User-Agent')
      );

      return res.status(HTTP_STATUS.OK).json({
        accessToken: signedAccessToken,
        refreshToken: signedRefreshToken,
      });
    } catch (error) {
      next(error);
    }
  };
}
