import express from 'express';

import { prisma } from '../utils/prisma.util.js';
import { resumeCreateValidator, resumeUpdateValidator } from '../middlewares/joi-handler.middleware.js';
import { ResumesRepository } from '../repositories/resumes.repository.js';
import { ResumesService } from '../services/resumes.service.js';
import { ResumesController } from '../controllers/resumes.controller.js';

const router = express.Router();

const resumesRepository = new ResumesRepository(prisma);
const resumesService = new ResumesService(resumesRepository);
const resumesController = new ResumesController(resumesService);

router.post('/', resumeCreateValidator, resumesController.createResume);

router.get('/', resumesController.getResume);

router.get('/:resumeId', resumesController.getResumeDetails);

router.patch('/:resumeId', resumeUpdateValidator, resumesController.updateResume);

router.delete('/:resumeId', resumesController.deleteResume);

export default router;
