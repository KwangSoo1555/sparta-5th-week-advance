// __tests__/unit/posts.repository.unit.spec.js

import { jest } from '@jest/globals';
import { ResumesRepository } from '../../../src/repositories/resumes.repository';

// Prisma 클라이언트에서는 아래 5개의 메서드만 사용합니다.
let mockPrisma = {
  resumes: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

let resumesRepository = new ResumesRepository(mockPrisma);

describe('Posts Repository Unit Test', () => {

  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  })
  
  test('createPost Method', async () => {
    const mockReturn = 'create Post Return String'
    mockPrisma.resumes.create.mockReturnValue(mockReturn);

    const createPostParams = {
        userId: 'createPostUserId', 
        title: 'createPostTitle', 
        introduce: 'createPostIntroduce', 
    }

    const createPostData = await resumesRepository.createPost(
        createPostParams.userId, 
        createPostParams.title, 
        createPostParams.introduce, 
    );

    expect(createPostData).toEqual(mockReturn);

    expect(mockPrisma.resumes.create).toHaveBeenCalledTimes(1);

    expect(mockPrisma.resumes.create).toHaveBeenCalledWith({
        data: {
            userId: createPostParams.userId, 
            title: createPostParams.title, 
            introduce: createPostParams.introduce, 
        }
    });
    
  });

  test('findAllPosts Method', async () => {
    const mockReturn = 'findMany String';
    mockPrisma.resumes.findMany.mockReturnValue(mockReturn);

    const resumes = await resumesRepository.findAllPosts();

    expect(resumes).toBe(mockReturn);

    expect(resumesRepository.prisma.resumes.findMany).toHaveBeenCalledTimes(1);
  });

});