import express from 'express';

import { prisma } from '../utils/prisma.util.js';
import { accessTokenValidator } from '../middlewares/require-access-token.middleware.js';

const router = express.Router();

router.get('/profile', accessTokenValidator, async (req, res, next) => {
  try {
    const authenticatedUser = await prisma.users.findUnique({
      where: { userId: req.userId },
      select: {
        userId: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!authenticatedUser) {
      return res.status(404).json({ error: 'Not found user' });
    }

    res.status(200).json(authenticatedUser);
  } catch (error) {
    next(error);
  }
});

export default router;
