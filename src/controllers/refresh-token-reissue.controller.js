import bcrypt from 'bcrypt';

import { JWT } from '../utils/generate-token.util.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { AUTH_CONSTANT } from '../constants/auth.constant.js';

export class RefreshTokenController {
  constructor(refreshTokenService) {
    this.refreshTokenService = refreshTokenService;
  }

  refreshToken = async (req, res, next) => {
    try {
      const userId = req.user.id;

      // access token and refresh token are reissued identically
      const reIssueAccessToken = await JWT.generateAccessToken(userId);
      const reIssueRefreshToken = await JWT.generateRefreshToken(userId);

      req.refreshToken = reIssueRefreshToken;
      console.log(req.refreshToken)
      console.log(reIssueRefreshToken)

      const hashedReIssueRefreshToken = await bcrypt.hash(reIssueRefreshToken, AUTH_CONSTANT.HASH_SALT);

      const updatedReIssueRefreshToken = await this.refreshTokenService.storeReIssueRefreshToken(
        userId, 
        reIssueAccessToken, 
        reIssueRefreshToken, 
        hashedReIssueRefreshToken, 
        req.ip,
        req.get('User-Agent'), 
      );

      return res.status(HTTP_STATUS.OK).json({ data: updatedReIssueRefreshToken });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Refresh token has expired.' });
      } else {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Invalid refresh token.' });
      }
    }
  };
}
