import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, IsOptional, IsEnum } from 'class-validator';
import { Role } from 'models/users.model';

export class CreateUserDto {
  @ApiProperty({ example: 'Ivan', description: 'First name' })
  @IsString({ message: 'Must be a string' })
  readonly first_name: string;

  @ApiProperty({ example: 'Ivanov', description: 'Last name' })
  @IsString({ message: 'Must be a string' })
  readonly last_name: string;

  @ApiProperty({ example: 'ivanov@gmail.com', description: 'email' })
  @IsString({ message: 'Must be a string' })
  @IsEmail({}, { message: 'Incorrect email' })
  readonly email: string;

  @ApiProperty({ example: '123456', description: 'password' })
  @IsString({ message: 'Must be a string' })
  @Length(4, 15, { message: 'min 4 max 15' })
  @IsOptional()
  readonly password: string;

  @ApiProperty({ example: 'super', description: 'user role' })
  @IsEnum(Role, { message: 'Must be one of enum' })
  @IsOptional()
  readonly roles: Role;
}

export class LoginUserDto {
  @ApiProperty({ example: 'ivanov@gmail.com', description: 'email' })
  @IsString({ message: 'Must be a string' })
  @IsEmail({}, { message: 'Incorrect email' })
  readonly email: string;

  @ApiProperty({ example: 'asc.pdlc,pc', description: 'user password' })
  @IsString({ message: 'Must be a string' })
  readonly password: string;
}
