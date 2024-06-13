import { ResumeService } from '../services/resumes.service.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';

export class ResumesController {
  resumeService = new ResumeService();

  createResume = async (req, res, next) => {
    try {
      const userId = req.userId;

      const { title, introduce } = req.body;

      if (!userId) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          status: HTTP_STATUS.BAD_REQUEST,
          message: MESSAGES.AUTH.COMMON.JWT.NO_USER,
        });
      }

      const createdPost = await this.resumeService.createPost(userId, title, introduce);

      return res.status(HTTP_STATUS.CREATED).json({ data: createdPost });
    } catch (error) {
      next(error);
    }
  };

  getResume = async (req, res, next) => {
    try {
      const findAllposts = await resumeService.findAllPosts();

      return res.status(HTTP_STATUS.OK).json({ data: findAllposts });
    } catch (error) {
      next(error);
    }
  };

  getResumeById = async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  };
}
