import express from 'express';
import bcrypt from 'bcrypt';

import { prisma } from '../utils/prisma.util.js';
import { signupValidator, loginValidator } from '../middlewares/joi-handler.middleware.js';
import { generateAccessToken, generateRefreshToken } from '../utils/generate-token.util.js';
import { verifyRefreshToken } from '../middlewares/require-refresh-token.middleware.js';

const router = express.Router();

const saltRounds = 10;

router.post('/sign-up', signupValidator, async (req, res, next) => {
  try {
    const { name, email, password, passwordCheck } = req.body;

    const isExistUser = await prisma.users.findFirst({
      where: { name, email },
    });
    if (isExistUser) {
      return res.status(409).json({ message: 'This email or name are already exist.' });
    }

    if (!passwordCheck) {
      return res.status(400).json({ message: 'You Should have to enter the passwordCheck.' });
    }

    if (password !== passwordCheck) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    const hashedPW = await bcrypt.hash(password, saltRounds);

    const usersCreate = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPW,
      },
    });

    usersCreate.password = undefined;

    return res.status(201).json({
      // status: HTTP
      // message: MESSAGE.
      data: usersCreate
    });
  } catch (error) {
    next(error);
  }
});

router.post('/log-in', loginValidator, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const registeredUser = await prisma.users.findFirst({ where: { email } });
    if (!registeredUser) {
      return res.status(401).json({ message: 'This email does not exist.' });
    }

    const matchPW = await bcrypt.compare(password, registeredUser.password);
    if (!matchPW) {
      return res.status(401).json({ message: 'Password does not match.' });
    }

    // Generate JWT and return it in the response.
    const signedAccessToken = generateAccessToken(registeredUser.userId);
    const signedRefreshToken = generateRefreshToken(registeredUser.userId);

    const hashedSignedRefreshToken = await bcrypt.hash(signedRefreshToken, saltRounds);

    // user can have refresh token only one.
    await prisma.refreshToken.deleteMany({
      where: { UserId: registeredUser.userId },
    });

    // RefreshToken is store to schema model RefreshToken.
    await prisma.refreshToken.create({
      data: {
        UserId: registeredUser.userId,
        token: hashedSignedRefreshToken,
        ip: req.ip,
        userAgent: req.headers['user-agent'],
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return res
      .status(200)
      .json({ accessToken: signedAccessToken, refreshToken: signedRefreshToken });
  } catch (error) {
    next(error);
  }
});

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

export default router
export { generateAccessToken, generateRefreshToken };
