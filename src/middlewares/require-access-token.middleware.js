import jwt from 'jsonwebtoken';
import { prisma } from '../utils/prisma.util.js';

const verifyAccessToken = async (req, res, next) => {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    return res.status(401).json({ error: 'Authorization information is missing.' });
  }

  const tokenParts = accessToken.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Unsupported authorization method.' });
  }

  try {
    const decodedToken = jwt.verify(tokenParts[1], process.env.ACCESS_TOKEN_SECRET_KEY);
    req.userId = decodedToken.userId;

    const user = await prisma.users.findUnique({
      where: { userId: req.userId },
    });
    
    if (!user) {
      return res.status(401).json({ error: 'Does not exist ' });
    }

    req.user = user;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Authorization token has expired.' });
    } else {
      return res.status(401).json({ error: 'Invalid authorization token.' });
    }
  }
};

export { verifyAccessToken };
