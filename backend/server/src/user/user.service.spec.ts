import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('UserService', () => {
  let service: UserService;

  const MockUserModel = {
    save: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,
      {
        provide: getModelToken(User.name),
        useValue: MockUserModel,
      }]
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
