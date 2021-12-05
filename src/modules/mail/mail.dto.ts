import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class EmailDto {
  @ApiProperty({ example: 'ivanov@gmail.com', description: 'email' })
  @IsString({ message: 'Must be a string' })
  @IsEmail({}, { message: 'Incorrect email' })
  readonly email: string;
  @ApiProperty({ example: 'Ivan', description: 'name' })
  @IsString({ message: 'Must be a string' })
  readonly name: string;
}
