import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto, LoginUserDto } from 'modules/users/create-user.dto';
import { CreateUserDtoResponse } from 'modules/users/types-api-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'modules/auth/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User, Role } from 'models/users.model';
import { RefreshDto } from './auth.dto';
import { hasRoles } from 'modules/auth/roles.decorator';
import { RolesGuard } from 'modules/auth/roles.guard';

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

  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 201 })
  @Post('/logout')
  @UseGuards(JwtAuthGuard)
  logout(@Req() request: Request, @Res() response: Response) {
    return this.authService.logout({ request, response });
  }

  @ApiOperation({ summary: 'Refresh token user' })
  @ApiResponse({ status: 201, type: RefreshDto })
  @Post('/refresh')
  @UseGuards(JwtAuthGuard)
  refresh(@Req() request: Request) {
    return this.authService.refresh(request);
  }

  @ApiOperation({ summary: 'Registration user' })
  @ApiResponse({ status: 200, type: CreateUserDtoResponse })
  @UseGuards(RolesGuard)
  @Post('/registration')
  @hasRoles(Role.ADMIN || Role.SUPER)
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
