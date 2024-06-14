// __tests__/unit/posts.service.unit.spec.js

import { jest } from '@jest/globals';
import { ResumesService } from '../../../src/services/resumes.service';

// PostsRepository는 아래의 5개 메서드만 지원하고 있습니다.
let mockResumesRepository = {
  findAllPosts: jest.fn(),
  findPostById: jest.fn(),
  createPost: jest.fn(),
  updatePost: jest.fn(),
  deletePost: jest.fn(),
};

// postsService의 Repository를 Mock Repository로 의존성을 주입합니다.
let postsService = new PostsService(mockPostsRepository);

describe('Posts Service Unit Test', () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  })

  test('findAllPosts Method', async () => {
    // TODO: 여기에 코드를 작성해야합니다.
  });

  test('deletePost Method By Success', async () => {
    // TODO: 여기에 코드를 작성해야합니다.
  });

  test('deletePost Method By Not Found Post Error', async () => {
    // TODO: 여기에 코드를 작성해야합니다.
  });
});