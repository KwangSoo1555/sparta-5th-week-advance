import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';

export class ResumesController {
  constructor(resumesService) {
    this.resumesService = resumesService;
  }

  createResume = async (req, res, next) => {
    try {
      const userId = req.user.id;

      const { title, introduce } = req.body;

      if (!userId) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          status: HTTP_STATUS.BAD_REQUEST,
          message: MESSAGES.AUTH.COMMON.JWT.NO_USER,
        });
      }

      const createdPost = await this.resumesService.createPost(userId, title, introduce);

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

  getResumeDetails = async (req, res, next) => {
    try {
      const resumeId = +req.params.resumeId;

      const post = await this.resumesService.findOnePost(resumeId);

      return res.status(HTTP_STATUS.OK).json({ data: post });
    } catch (error) {
      next(error);
    }
  };

  updateResume = async (req, res, next) => {
    try {
      const resumeId = +req.params.resumeId;
      const { title, introduce } = req.body;

      const findResume = await this.resumesService.checkResume({ id: resumeId });

      if (!findResume) {
        throw new Error('Resume is not exist.');
      }

      const updatedPost = await this.resumesService.updatePost(resumeId, title, introduce);

      return res.status(HTTP_STATUS.OK).json({ data: updatedPost });
    } catch (error) {
      next(error);
    }
  };

  deleteResume = async (req, res, next) => {
    try {
      const resumeId = +req.params.resumeId;

      const findResume = await this.resumesService.checkResume({ id: resumeId });

      if (!findResume) {
        throw new Error('Resume is not exist.');
      }

      const deletedPost = await this.resumesService.deletePost(resumeId);

      return res.status(HTTP_STATUS.OK).json({ data: deletedPost });
    } catch (error) {
      next(error);
    }
  };
}
