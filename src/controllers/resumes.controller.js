// import { ResumeService } from '../services/resumes.service.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';

export class ResumesController {
  constructor(resumesService) {
    this.resumesService = resumesService;
  }

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

      const createdPost = await this.resumesService.createPost(
        userId,
        title,
        introduce
      );

      return res.status(HTTP_STATUS.CREATED).json({ data: createdPost });
    } catch (error) {
      next(error);
    }
  };

  getResume = async (req, res, next) => {
    try {
      const posts = await this.resumesService.findAllPosts();

      return res.status(HTTP_STATUS.OK).json({ data: posts });
    } catch (error) {
      next(error);
    }
  };

  getResumeById = async (req, res, next) => {
    try {
      const { resumeId } = req.params;

      const post = await this.resumesService.findPostById(
        resumeId,
      );

      return res.status(200).json({ data: post });
    } catch (error) {
      next(error);
    }
  };

  updateResume = async (req, res, next) => {
    try {
      const { resumeId } = req.params;
      const { title, content } = req.body;

      const findResume = await this.resumesService.findResume(resumeId);

      if (!findResume) {
        throw new Error ('Resume is not exist.');
      }

        const updatedpost = await this.resumesService.updatePost(
          resumeId,
          title,
          content,
        );

      return res.status(200).json({ data: updatedpost })
    } catch (error) {
      next(error);
    }
  }

  deleteResume = async (req, res, next) => {
    try {
      const { resumeId } = req.params;

      const findResume = await this.resumesService.findResume(resumeId);

      if (!findResume) {
        throw new Error ('Resume is not exist.');
      }

      const deletedPost = await this.resumesService.deletePost(
        resumeId,
      );

      return res.status(200).json({ data: deletedPost })
    } catch (error) {
      next(error);
    }
  }
}
