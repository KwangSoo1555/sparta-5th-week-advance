import express from 'express';

import { signupValidator, loginValidator } from '../middlewares/joi-handler.middleware.js';
import { AuthController } from '../controllers/auth.controller.js';

const router = express.Router();

const authController = new AuthController();

router.post('/sign-up', signupValidator, authController.signupUser);

router.post('/log-in', loginValidator, authController.loginUser);

export default router;
