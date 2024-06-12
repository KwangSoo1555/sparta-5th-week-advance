import express from 'express';
import jwt from 'jsonwebtoken';

import { verifyRefreshToken } from '../middlewares/require-refresh-token.middleware.js';

const router = express.Router();

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '12h' });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: '7d' });
};

// When accessToken expires and refreshToken is vaild, accessToken can be reissue.
router.post('/refreshToken', verifyRefreshToken, async (req, res, next) => {
  try {
    const userId = req.userId;

    const newAccessToken = generateAccessToken(userId);

    return res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Refresh token has expired.' });
    } else {
      return res.status(401).json({ error: 'Invalid refresh token.' });
    }
  }
});

export { router, generateAccessToken, generateRefreshToken };
