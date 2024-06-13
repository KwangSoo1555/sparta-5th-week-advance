import express from 'express';

import { resumeCreateValidator, resumeUpdateValidator } from '../middlewares/joi-handler.middleware.js';
import { ResumesController } from '../controllers/resumes.controller.js';

const router = express.Router();

const resumesController = new ResumesController();

router.post('/', resumeCreateValidator, resumesController.createResume);

router.get('/', resumesController.getResume);

router.get('/:resumeId', resumesController.getResumeById);

router.patch('/:resumeId', resumeUpdateValidator, resumesController.updateResume);

router.delete('/:resumeId', resumesController.deleteResume);

export default router;
