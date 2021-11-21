import { Body, Controller, Post, UseGuards, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
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
  logout(@Req() request: Request, @Res() response: Response) {
    return this.authService.logout({ request, response });
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
