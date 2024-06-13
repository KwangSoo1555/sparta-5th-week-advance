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
}
