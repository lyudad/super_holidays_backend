import { Controller, Get } from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getHello(): string {
    return "I'm a get USER request!";
  }
}
