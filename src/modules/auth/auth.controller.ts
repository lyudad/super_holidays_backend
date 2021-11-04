import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  getHello(): string {
    return "I'm a get request!";
  }
}
