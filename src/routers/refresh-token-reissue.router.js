import express from 'express';

import { RefreshTokenController } from '../controllers/refresh-token-reissue.controller.js';

const router = express.Router();

const refreshTokenController = new RefreshTokenController();

router.post('/', refreshTokenController.refreshToken);

export default router;
