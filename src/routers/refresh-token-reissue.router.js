import express from 'express';

import { prisma } from '../utils/prisma.util.js';
import { RefreshTokenRepository } from '../repositories/refresh-token-reissue.repository.js';
import { RefreshTokenService } from '../services/refresh-token-reissue.service.js';
import { RefreshTokenController } from '../controllers/refresh-token-reissue.controller.js';

const router = express.Router();

const refreshTokenRepository = new RefreshTokenRepository(prisma);
const refreshTokenService = new RefreshTokenService(refreshTokenRepository);
const refreshTokenController = new RefreshTokenController(refreshTokenService);

router.post('/', refreshTokenController.refreshToken);

export default router;
