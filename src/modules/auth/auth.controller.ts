import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, LoginUserDto } from 'modules/users/create-user.dto';
import { AuthService } from './auth.service';
import { User } from 'models/users.model';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, type: User })
  @Post('/login')
  login(@Body() user: LoginUserDto) {
    return this.authService.login(user);
  }

  @ApiOperation({ summary: 'Registration user' })
  @ApiResponse({ status: 200, type: User })
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
