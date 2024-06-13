import { applicationStatusType } from '@prisma/client';
import { ResumeRepository } from '../repositories/resumes.repository.js';

export class ResumeService {
  resumeRepository = new ResumeRepository();

  createPost = async (userId, title, introduce) => {
    const createdPost = await this.resumeRepository.createPost(
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
    const posts = await this.resumeRepository.findAllPosts();

    posts.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return posts.map((posts) => {
      return {
        id: posts.id,
        title: posts.title,
        applicationStatusType: posts.applicationStatus,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
      };
    });
  };

  findPostById = async (resumeId) => {
    const post = await this.resumeRepository.findPostById(
      resumeId
    );

    return {
      id: post.id,
      title: post.title,
      introduce: post.introduce,
      applicationStatusType: post.applicationStatus,
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

    const updatedPost = await this.resumeRepository.findPostById(
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
    const post = await this.resumeRepository.deletePost(
      resumeId,
    );

    return {
      id: post.id,
      title: post.title,
      introduce: post.introduce,
      applicationStatusType: post.applicationStatus,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }
  }

  findResume = async (resumeId) => {
    return await this.resumeRepository.findResume(resumeId);
  };
}
