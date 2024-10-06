import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { getModelToken } from '@nestjs/mongoose';
import { Post } from './schemas/posts.schema';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CanActivate } from '@nestjs/common';

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;

  // Mock PostService and Mongoose model
  const mockPostService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockPostModel = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    save: jest.fn(),
  };

  const mockJwtAuthGuard: CanActivate = {
    canActivate: jest.fn(() => true), // Always allow access
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PostsService,
          useValue: mockPostService, // Use the mock service
        },
        {
          provide: getModelToken(Post.name), // Mock the Mongoose Post model
          useValue: mockPostModel,
        },
      ],
    }).overrideGuard(JwtAuthGuard) // Override the guard
    .useValue(mockJwtAuthGuard)
    .compile();

    controller = module.get<PostsController>(PostsController);
    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Additional test cases can be added here
});
