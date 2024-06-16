import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { prisma } from '../utils/prisma.util.js';

const refreshTokenValidator = async (req, res, next) => {
  const refreshToken = req.headers.authorization;

  if (!refreshToken) {
    return res.status(401).json({ error: 'Authorization information is missing.' });
  }

  const tokenParts = refreshToken.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Unsupported authorization method.' });
  }

  const token = tokenParts[1];

  try {
    const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY);
    const userId = decodedToken.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Invalid token structure.' });
    }

    const user = await prisma.users.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(401).json({ error: 'User does not exist.' });
    }

    const storedToken = await prisma.refreshToken.findFirst({
      where: { userId: userId },
    });

    if (!storedToken) {
      return res.status(401).json({ error: 'Invalid or expired refresh token.' });
    }

    const isTokenValid = await bcrypt.compare(token, storedToken.refreshToken);

    if (!isTokenValid) {
      return res.status(401).json({ error: 'Invalid refresh token.' });
    }

    req.user = user;
    req.refreshToken = token;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Refresh token has expired.' });
    } else {
      return res.status(401).json({ error: 'Invalid refresh token.' });
    }
  }
};

export { refreshTokenValidator };
