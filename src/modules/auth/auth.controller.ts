import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto, LoginUserDto } from 'modules/users/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'modules/auth/jwt-auth.guard';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() user: LoginUserDto) {
    return this.authService.login(user);
  }

  @Post('/logout')
  @UseGuards(JwtAuthGuard)
  logout(@Req() request: Request) {
    return this.authService.logout(request);
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
