import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class BlockUserDto {
  @ApiProperty({ example: '15', description: 'id' })
  @IsNumber({}, { message: 'Must be a number' })
  readonly userId: number;
}
