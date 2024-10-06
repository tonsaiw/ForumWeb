import { Controller, Get, Post, Body,Param } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  create(@Body() registerDto: RegisterDto) {
    return this.userService.create(registerDto);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findByEmail(+id);
  // }
}
