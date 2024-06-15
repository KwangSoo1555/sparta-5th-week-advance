import express from 'express';

import { prisma } from '../utils/prisma.util.js';
import { UserProfileRepository } from '../repositories/user.repository.js';
import { UserProfileService } from '../services/user.service.js';
import { UserProfileController } from '../controllers/user.controller.js';

const router = express.Router();

const userProfileRepository = new UserProfileRepository(prisma);
const userProfileService = new UserProfileService(userProfileRepository);
const userProfileController = new UserProfileController(userProfileService);

router.get('/', userProfileController.getUserProfile);

router.patch('/:userId', userProfileController.updateUserProfile);

export default router;
