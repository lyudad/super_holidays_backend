import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'Ivan', description: 'First name' })
  @IsString({ message: 'Must be a string' })
  @IsOptional()
  first_name: string;

  @ApiProperty({ example: 'Ivanov', description: 'Last name' })
  @IsString({ message: 'Must be a string' })
  @IsOptional()
  last_name: string;

  @ApiProperty({ example: 'ivanov@gmail.com', description: 'email' })
  @IsString({ message: 'Must be a string' })
  @IsEmail({}, { message: 'Incorrect email' })
  @IsOptional()
  email: string;
}
