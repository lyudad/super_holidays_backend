import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class RefreshDto {
  @ApiProperty({ example: 'ikvmdfokvmdovk', description: 'accessToken' })
  @IsString({ message: 'Must be a string' })
  readonly accessToken: string;
  @ApiProperty({ example: 'ikvmdfokvmdovk', description: 'refreshToken' })
  @IsString({ message: 'Must be a string' })
  readonly refreshToken: string;
  @ApiProperty({ example: 'ikvmdfokvmdovk', description: 'session id' })
  @IsNumber()
  readonly sid: number;
}
