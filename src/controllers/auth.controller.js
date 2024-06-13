import bcrypt from 'bcrypt';

import { AuthService } from '../services/auth.service.js';
import { GenerateToken } from '../utils/generate-token.util.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import { AUTH_CONSTANT } from '../constants/auth.constant.js';

export class AuthController {
  authService = new AuthService();

  signupUser = async (req, res, next) => {
    try {
      const { name, email, password, passwordCheck } = req.body;

      if (!passwordCheck) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          status: HTTP_STATUS.BAD_REQUEST,
          message: 'You Should have to enter the passwordCheck.',
        });
      }

      if (password !== passwordCheck) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          status: HTTP_STATUS.BAD_REQUEST,
          message: 'Passwords do not match.',
        });
      }

      const findUserByEmail = await this.authService.findUserByEmail(email);

      if (findUserByEmail) {
        const isExistEmail = findUserByEmail.email;
        const isExistName = findUserByEmail.name;

        if (isExistEmail) {
          return res.status(HTTP_STATUS.CONFLICT).json({
            status: HTTP_STATUS.CONFLICT,
            message: 'This email already exists.',
          });
        }

        if (isExistName) {
          return res.status(HTTP_STATUS.CONFLICT).json({
            status: HTTP_STATUS.CONFLICT,
            message: 'This name already exists.',
          });
        }
      }

      const hashedPW = await bcrypt.hash(password, AUTH_CONSTANT.HASH_SALT);

      const registeredUser = await this.authService.registerUser(
        name,
        email,
        hashedPW
      );

      return res.status(HTTP_STATUS.CREATED).json({
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
        return res.status(401).json({ message: 'This email does not exist.' });
      }

      const matchPW = await bcrypt.compare(password, findUserByEmail.password);
      if (!matchPW) {
        return res.status(401).json({ message: 'Password does not match.' });
      }

      // Generate JWT and return it in the response.
      const signedAccessToken = await GenerateToken.accessToken(findUserByEmail.id);
      const signedRefreshToken = await GenerateToken.refreshToken(findUserByEmail.id);

      // Store refresh token in the database
      await GenerateToken.storeRefreshToken(
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
