import express from 'express';

import { prisma } from '../utils/prisma.util.js';
import { verifyAccessToken } from '../middlewares/require-access-token.middleware.js';
import { requireRoles } from '../middlewares/require-roles.middleware.js';

const router = express.Router();

// Assign role as recruiter
router.patch('/:userId/role', verifyAccessToken, requireRoles(['RECRUITER']), async (req, res, next) => {
    try {
      const userId = Number(req.params.userId);
      const role = req.body.role;
  
      if (!role) {
        return res.status(400).json({ error: 'Enter the role to change.' });
      }
  
      const allowedRoles = ['APPLICANT', 'RECRUITER'];
      if (!allowedRoles.includes(role.toUpperCase())) {
        return res.status(400).json({ error: 'Not valid role.' });
      }
  
      const user = await prisma.users.findUnique({
        where: { userId: userId }
      });
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      const updatedUser = await prisma.users.update({
        where: { userId: userId },
        data: { role: role.toUpperCase() },
      });
  
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  });

// Recruiters can find whole resume
router.get('/', verifyAccessToken, requireRoles(['RECRUITER']), async (req, res) => {
  try {
    const { sort = 'asc', status } = req.query;
    const orderBy = sort === 'desc' ? 'desc' : 'asc';

    const findAllResume = await prisma.resume.findMany({
      where: status ? { applicationStatus: status } : {},
      orderBy: {
        createdAt: orderBy,
      },
    });

    res.status(200).json(findAllResume);
  } catch (error) {
    next(error);
  }
});

// Recruiters can find specific resumes
router.get('/resume/:resumeId', verifyAccessToken, requireRoles(['RECRUITER']), async (req, res, next) => {
  try {
    const resumeId = Number(req.params.id);

    const findDetailResume = await prisma.resume.findUnique({
      where: { resumeId: resumeId },
    });

    if (!findDetailResume) {
      return res.status(404).json({ error: 'Not found the resume.' });
    }

    res.status(200).json(findDetailResume);
  } catch (error) {
    next(error);
  }
});

// Application status change
router.patch('/resume/status/:id', verifyAccessToken, requireRoles(['RECRUITER']), async (req, res, next) => {
  try {
    const resumeId = Number(req.params.id);
    const { applicationStatus, reason } = req.body;

    if (!applicationStatus) {
      return res.status(400).json({ error: 'Enter the application status to change.' });
    }
    if (!reason) {
      return res
        .status(400)
        .json({ error: 'Enter the reason for the change in application status.' });
    }

    const resume = await prisma.resume.findUnique({
      where: { resumeId: resumeId },
    });

    if (!resume) {
      return res.status(404).json({ error: 'Resume does not exist.' });
    }

    const validApplicationStatuses = ['APPLY', 'DROP', 'PASS', 'INTERVIEW1', 'INTERVIEW2', 'FINAL_PASS'];
    if (!validApplicationStatuses.includes(applicationStatus.toUpperCase())) {
        return res.status(400).json({ error: 'Not valid application status.' });
      }

    const updatedApplicationStatus = await prisma.resume.update({
      where: { resumeId: resumeId },
      data: {
        applicationStatus: applicationStatus.toUpperCase(),
      },
    });
    console.log(updatedApplicationStatus)

    const newResumeLog = await prisma.resume.create({
      data: {
        resumeId: resumeId,
        recruiterId: req.user.userId,
        oldStatus: resume.applicationStatus,
        newStatus: applicationStatus.toUpperCase(),
        reason, 
      },
    });

    res.status(200).json(newResumeLog);
  } catch (error) {
    next(error);
  }
});

// Resume log list search
router.get('/:id/logs', verifyAccessToken, requireRoles(['RECRUITER']), async (req, res, next) => {
  try {
    const resumeId  = Number(req.params.id);

    const resumeLogs = await prisma.resumeLog.findMany({
      where: { ResumeId: resumeId },
      include: { recruiterId: true },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json(resumeLogs);
  } catch (error) {
    next(error);
  }
});

export { router };
