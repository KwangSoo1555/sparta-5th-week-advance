import { ResumeRepository } from '../repositories/resumes.repository.js';

export class ResumeService {
  resumeRepository = new ResumeRepository();

  createPost = async (userId, title, introduce) => {
    const createdPost = await this.resumeRepository.createPost(userId, title, introduce);

    return {
      postId: createdPost.postId,
      title: createdPost.title,
      introduce: createdPost.introduce,
      createdAt: createdPost.createdAt,
      updatedAt: createdPost.updatedAt,
    };
  };

  findAllPosts = async () => {
    const posts = await this.resumeRepository.findAllPosts();

    posts.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return posts.map((posts) => {
      return {
        postId: posts.postId,
        title: posts.title,
        introduce: posts.introduce,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
      };
    });
  };
}
