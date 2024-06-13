// import { prisma } from '../utils/prisma.util.js';

export class ResumesRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  createPost = async (userId, title, introduce) => {
    const createdPost = await this.prisma.resumes.create({
      data: {
        userId,
        title,
        introduce,
      },
    });
    return createdPost;
  };

  findAllPosts = async () => {
    const posts = await this.prisma.resumes.findMany();

    return posts;
  };

  findPostById = async (resumeId) => {
    const post = await this.prisma.resumes.findUnique({
      where: { id: +resumeId },
    });

    return post;
  };

  updatePost = async (resumeId, title, introduce) => {
    const updatedPost = await this.prisma.resumes.update({
      where: {id: +resumeId}, 
      data: {
        ...(title && {title}),
        ...(introduce && {introduce}), 
      }, 
    });

    return updatedPost;
  };

  deletePost = async (resumeId) => {
    const deletedPost = await this.prisma.resumes.delete({
      where: {
        id: +resumeId
      }, 
    });

    return deletedPost;
  };

  findResume = async (resumeId) => {
    return await this.prisma.resumes.findUnique({
      where: { id: +resumeId },
    });
  };
};
