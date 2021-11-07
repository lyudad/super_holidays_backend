// import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  // @ApiProperty({ example: 'Ivan', description: 'First name' })
  readonly value: string;
  // @ApiProperty({ example: 'Ivanov', description: 'Last name' })
  readonly description: string;
}
