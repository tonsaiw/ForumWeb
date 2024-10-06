import { Controller, HttpCode, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('/login')
  async login(@Request() req, @Res({ passthrough: true }) res) {
    
    // sign jwt
    const access_token = await this.authService.signJwt(req.user);
    // save the token in the cookie
    res.cookie('access_token', access_token, {
      httpOnly: true,
    });
    return {
      message: 'Login successful',
    };
  } 
}
