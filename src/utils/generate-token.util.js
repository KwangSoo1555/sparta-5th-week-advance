import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; // 리프레쉬토큰 해쉬

import { prisma } from './prisma.util.js'; // 리프레쉬토큰 저장

const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '12h' });
};

const generateRefreshToken = (userId) => {
    return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: '7d' });
};

export { generateAccessToken, generateRefreshToken }