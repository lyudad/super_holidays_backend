import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class BlockUserDto {
  @ApiProperty({ example: 'true', description: 'isBlock' })
  @IsBoolean({ message: 'Boolean' })
  isBlocked: boolean;
}
