import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class BlockUserDto {
  @ApiProperty({ example: '5', description: 'Id of user' })
  @IsNumber({}, { message: 'Must be a number' })
  readonly userId: number;
}
