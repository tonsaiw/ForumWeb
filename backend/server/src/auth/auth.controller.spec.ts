import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const mockAuthService = {
      signJwt: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).overrideGuard(LocalAuthGuard).useValue({
      canActive: jest.fn(() => true),
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should login and set JWT in cookies', async () => {
    const req = {
      user: { username: 'testUser', userId: '12345' }, // Mock request object with user
    };

    const res = {
      cookie: jest.fn(), // Mock response object with cookie method
    };

    const jwt = 'testJwtToken';
    jest.spyOn(authService, 'signJwt').mockResolvedValue(jwt); // Mocking signJwt to return a token

    const result = await controller.login(req, res);

    expect(authService.signJwt).toHaveBeenCalledWith(req.user);
    expect(res.cookie).toHaveBeenCalledWith('access_token', jwt, { httpOnly: true });
    expect(result).toEqual({ message: 'Login successful' });
  });
});
