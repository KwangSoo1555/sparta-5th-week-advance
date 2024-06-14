// __tests__/unit/posts.service.unit.spec.js

import { jest } from '@jest/globals';
import { ResumesService } from '../../../src/services/resumes.service';
import { resumeStatusType } from '@prisma/client';

// PostsRepository는 아래의 5개 메서드만 지원하고 있습니다.
let mockResumesRepository = {
  findAllPosts: jest.fn(),
  findPostById: jest.fn(),
  createPost: jest.fn(),
  updatePost: jest.fn(),
  deletePost: jest.fn(),
};

// postsService의 Repository를 Mock Repository로 의존성을 주입합니다.
let resumesService = new ResumesService(mockResumesRepository);

describe('Posts Service Unit Test', () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  })

  test('findAllPosts Method', async () => {
    const samplePosts = [
        {
			"id": 5,
			"title": "안녕하세요 이길동입니다.",
			"createdAt": "2024-06-13T22:29:52.497Z",
			"updatedAt": "2024-06-13T22:29:52.497Z"
		},
		{
			"id": 4,
			"title": "안녕하세요 박길동입니다.",
			"createdAt": "2024-06-14T22:29:47.028Z",
			"updatedAt": "2024-06-14T22:29:47.028Z"
		},
    ];

    mockResumesRepository.findAllPosts.mockReturnValue(samplePosts);

    const allPosts = await resumesService.findAllPosts();

    expect(allPosts).toEqual(
        samplePosts.sort((a, b) => {
            return b.createdAt - a.createdAt;
        })
    );

    expect(mockResumesRepository.findAllPosts).toHaveBeenCalledTimes(1);
  });

  test('deletePost Method By Success', async () => {
    const samplePost = {
        "id": 5,
		"userId": 1,
		"title": "안녕하세요 이길동입니다.",
		"introduce": "저의 5 번째 이력서입니다.",
		"resumeStatusType": "APPLY",
		"createdAt": "2024-06-13T22:29:52.497Z",
		"updatedAt": "2024-06-13T22:29:52.497Z"
    }
    mockResumesRepository.findPostById.mockReturnValue(samplePost);

    const deletedPost = await resumesService.deletePost(5);

    expect(mockResumesRepository.findPostById).toHaveBeenCalledTimes(1);
    expect(mockResumesRepository.findPostById).toHaveBeenCalledTimes(samplePost.id);

    expect(deletedPost).toEqual({
        id: samplePost.id, 
        userId: samplePost.userId, 
        title: samplePost.title, 
        introduce: samplePost.introduce, 
        resumeStatusType: samplePost.resumeStatusType, 
        createdAt: samplePost.createdAt, 
        updatedAt: samplePost.updatedAt, 
    })
  });

  test('deletePost Method By Not Found Post Error', async () => {
    // TODO: 여기에 코드를 작성해야합니다.
  });
});