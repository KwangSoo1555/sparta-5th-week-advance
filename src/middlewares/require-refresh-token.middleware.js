import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { prisma } from '../utils/prisma.util.js';

const verifyRefreshToken = async (req, res, next) => {
  const refreshToken = req.headers['refresh-token'];

  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token is missing.' });
  }

  try {
    const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);
    req.userId = decodedToken.userId;

    const user = await prisma.users.findUnique({ where: { userId: req.userId } });
    if (!user) {
      return res.status(401).json({ error: 'User does not exist.' });
    }

    const storedToken = await prisma.refreshToken.findFirst({
      where: { UserId: req.userId },
    });
    if (!storedToken || storedToken.expiresAt < new Date()) {
      return res.status(401).json({ error: 'Invalid or expired refresh token.' });
    }

    const isTokenValid = await bcrypt.compare(refreshToken, storedToken.token);
    if (!isTokenValid) {
      return res.status(401).json({ error: 'Invalid refresh token.' });
    }

    req.user = user;
    req.refreshToken = refreshToken;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Refresh token has expired.' });
    } else {
      return res.status(401).json({ error: 'Invalid refresh token.' });
    }
  }
};

export { verifyRefreshToken };
