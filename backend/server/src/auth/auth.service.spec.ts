import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('should validate user correctly', async () => {
  //   const mockUser = { username: 'test', _id: '123' };
  //   jest.spyOn(userService, 'findByEmail').mockResolvedValue(mockUser);
  //   const result = await service.validateUser('test@example.com', 'password');
  //   expect(result).toEqual({ username: 'test', userId: '123' });
  // });

  // // Example test for signJwt method
  // it('should return a signed JWT', async () => {
  //   const mockUser = { username: 'test', userId: '123' };
  //   jest.spyOn(jwtService, 'sign').mockReturnValue('signed-token');
  //   const token = await service.signJwt(mockUser);
  //   expect(token).toEqual('signed-token');
  // });
});
