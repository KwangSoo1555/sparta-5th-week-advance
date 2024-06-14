// import { ResumeRepository } from '../repositories/resumes.repository.js';

export class ResumesService {
  constructor(resumesRepository) {
    this.resumesRepository = resumesRepository;
  }

  createPost = async (userId, title, introduce) => {
    const createdPost = await this.resumesRepository.createPost(
      userId,
      title,
      introduce,
    );

    return {
      id: createdPost.id,
      title: createdPost.title,
      introduce: createdPost.introduce,
      createdAt: createdPost.createdAt,
      updatedAt: createdPost.updatedAt,
    };
  };

  findAllPosts = async () => {
    const posts = await this.resumesRepository.findAllPosts();

    posts.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return posts.map((posts) => {
      return {
        id: posts.id,
        title: posts.title,
        resumeStatusType: posts.resumeStatusType,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
      };
    });
  };

  findPostById = async (resumeId) => {
    const post = await this.resumesRepository.findPostById(
      resumeId
    );

    return {
      id: post.id,
      userId: post.userId, 
      title: post.title,
      introduce: post.introduce,
      resumeStatusType: post.resumeStatusType,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  };

  updatePost = async (resumeId, title, introduce) => {
    await this.resumeRepository.updatePost(
      resumeId,
      title,
      introduce,
    );

    const updatedPost = await this.resumesRepository.findPostById(
      resumeId,
    );

    return {
      id: updatedPost.id,
      title: updatedPost.title,
      introduce: updatedPost.introduce,
      updatedAt: updatedPost.updatedAt,
    };
  };

  deletePost = async (resumeId) => {
    const post = await this.resumesRepository.deletePost(
      resumeId,
    );

    return {
      id: post.id,
      title: post.title,
      introduce: post.introduce,
      resumeStatusType: post.resumeStatusType,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }
  }

  findResume = async (resumeId) => {
    return await this.resumesRepository.findResume(resumeId);
  };
}
