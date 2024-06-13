import express from 'express';
import authRouter from './auth.router.js';
import refreshTokenRouter from './refresh-token-reissue.router.js';
import resumesRouter from './resumes.router.js';
import recruiterRouter from './recruiter.router.js';

import { accessTokenValidator } from '../middlewares/require-access-token.middleware.js';
import { refreshTokenValidator } from '../middlewares/require-refresh-token.middleware.js';

const router = express.Router();

router.use('/', authRouter);
router.use('/refreshToken', refreshTokenValidator, refreshTokenRouter);
router.use('/resume', accessTokenValidator, resumesRouter);
router.use('/recruiter', accessTokenValidator, recruiterRouter);

export default router;
