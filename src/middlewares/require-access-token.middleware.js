import jwt from 'jsonwebtoken';
import { prisma } from '../utils/prisma.util.js';

const accessTokenValidator = async (req, res, next) => {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    return res.status(401).json({ error: 'Authorization information is missing.' });
  }

  const tokenParts = accessToken.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Unsupported authorization method.' });
  }

  const token = tokenParts[1]

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
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

    user.password = undefined;
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

export { accessTokenValidator };
