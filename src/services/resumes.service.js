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

  findOnePost = async (resumeId) => {
    const post = await this.resumesRepository.findOnePost(resumeId);

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
    const updatedPost = await this.resumesRepository.updatePost(resumeId, title, introduce);

    return {
      id: updatedPost.id,
      title: updatedPost.title,
      introduce: updatedPost.introduce,
      updatedAt: updatedPost.updatedAt,
    };
  };

  deletePost = async (resumeId) => {
    const deletedPost = await this.resumesRepository.deletePost(resumeId);

    return {
      id: deletedPost.id,
      title: deletedPost.title,
      introduce: deletedPost.introduce,
      resumeStatusType: deletedPost.resumeStatusType,
      createdAt: deletedPost.createdAt,
      updatedAt: deletedPost.updatedAt,
    };
  };

  checkResume = async (params) => {
    return await this.resumesRepository.checkResume(params);
  };
}
