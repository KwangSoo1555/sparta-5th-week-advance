import { RefreshTokenService } from '../services/refresh-token-reissue.service.js';
import { JWT } from '../utils/generate-token.util.js';

export class RefreshTokenController {
  refreshTokenService = new RefreshTokenService();

  refreshToken = async (req, res, next) => {
    try {
      const userId = req.user.Id;

      // access token and refresh token are reissued identically
      const reIssueAccessToken = await JWT.accessToken(userId);
      const reIssueRefreshToken = await JWT.refreshToken(userId);

      return res.status(200).json({
        accessToken: reIssueAccessToken,
        refreshToken: reIssueRefreshToken,
      });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Refresh token has expired.' });
      } else {
        return res.status(401).json({ error: 'Invalid refresh token.' });
      }
    }
  };
}
