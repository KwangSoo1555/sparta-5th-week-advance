import express from 'express';

import { prisma } from '../utils/prisma.util.js';
import { signupValidator, loginValidator } from '../middlewares/joi-handler.middleware.js';
import { AuthRepository } from '../repositories/auth.repository.js';
import { AuthService } from '../services/auth.service.js';
import { AuthController } from '../controllers/auth.controller.js';

const router = express.Router();

const authRepository = new AuthRepository(prisma);
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

router.post('/sign-up', signupValidator, authController.signupUser);

router.post('/log-in', loginValidator, authController.loginUser);

export default router;
