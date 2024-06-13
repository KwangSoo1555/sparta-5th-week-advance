import { prisma } from '../utils/prisma.util.js';

export class ResumeRepository {
  createPost = async (userId, title, introduce) => {
    const createdPost = await prisma.resume.create({
      data: {
        userId,
        title,
        introduce,
      },
    });
    return createdPost;
  };

  findAllPosts = async () => {
    const posts = await prisma.resume.findMany();

    return posts;
  };

  findPostById = async (resumeId) => {
    const post = await prisma.resume.findUnique({
      where: { id: +resumeId },
    });

    return post;
  };

  updatePost = async (resumeId, title, introduce) => {
    const updatedPost = await prisma.resume.update({
      where: {id: +resumeId}, 
      data: {
        ...(title && {title}),
        ...(introduce && {introduce}), 
      }, 
    });

    return updatedPost;
  };

  deletePost = async (resumeId) => {
    const deletedPost = await prisma.resume.delete({
      where: {
        id: +resumeId
      }, 
    });

    return deletedPost;
  };

  findResume = async (resumeId) => {
    return await prisma.resume.findUnique({
      where: { id: +resumeId },
    });
  };
};
