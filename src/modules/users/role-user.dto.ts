import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Role } from 'models/users.model';

export class RoleUserDto {
  @ApiProperty({ example: 'super', description: 'user role' })
  @IsEnum(Role, { message: 'Must be one of enum' })
  readonly roles: Role;
}
