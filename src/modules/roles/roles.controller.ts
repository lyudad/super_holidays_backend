import { Controller, Param, Post, Get, Body } from '@nestjs/common';
import { CreateRoleDto } from './dto';
import { RolesService } from './roles.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from 'models/roles.model';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RolesService) {}

  @ApiOperation({ summary: 'Create role' })
  @ApiResponse({ status: 200, type: Role })
  @Post()
  create(@Body() roleDto: CreateRoleDto) {
    return this.roleService.createRole(roleDto);
  }

  @ApiOperation({ summary: 'Get role' })
  @ApiResponse({ status: 200, type: [Role] })
  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
