import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  // 1. Inject AuthService
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  // guard when login
  async validate(email: string, password: string): Promise<any> {
    // 2. Call validateUser to check if user exists
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    // data from local.strategy.ts always return in req.user
    return user;
  }
}