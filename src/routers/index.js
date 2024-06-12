import express from 'express';
import authRouter from './auth.router.js';
import resumesRouter from './resumes.router.js';
import recruiterRouter from './recruiter.router.js';

import { accessTokenValidator } from '../middlewares/require-access-token.middleware.js';
// import tokenReissue from './';

const router = express.Router();

router.use('/', authRouter);
router.use('/resume', accessTokenValidator, resumesRouter);
// router.use('/', tokenReissue);
router.use('/recruiter', accessTokenValidator, recruiterRouter);

export default router