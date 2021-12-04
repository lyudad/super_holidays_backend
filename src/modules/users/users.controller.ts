import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Role, User } from 'models/users.model';
import { JwtAuthGuard } from 'modules/auth/jwt-auth.guard';
import { BlockUserDto } from './block-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { hasRoles } from 'modules/auth/roles.decorator';
import { RolesGuard } from 'modules/auth/roles.guard';
import { RoleUserDto } from './role-user.dto';
import {
  GetAllUserResponse,
  CreateUserDtoResponse,
} from './types-api-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [GetAllUserResponse] })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @hasRoles(Role.ADMIN) // SUPER
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Block users' })
  @ApiResponse({ status: 200, type: CreateUserDtoResponse })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/block')
  @hasRoles(Role.ADMIN, Role.SUPER) // SUPER
  blockUser(@Body() dto: BlockUserDto) {
    return this.usersService.blockUser(dto);
  }

  @ApiOperation({ summary: 'Delete users' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/:id')
  @hasRoles(Role.ADMIN) // SUPER
  deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }

  @ApiOperation({ summary: 'Update users' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('/:id')
  @hasRoles(Role.ADMIN) // SUPER
  updateUser(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.usersService.updateUser(id, dto);
  }

  //ONLY SUPER!!!!!!!!!!!!!!!!
  @ApiOperation({ summary: 'Update role' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('/:id/roles')
  @hasRoles(Role.SUPER)
  updateRole(@Param('id') id: number, @Body() dto: RoleUserDto) {
    return this.usersService.updateRoleUser(id, dto);
  }
}
