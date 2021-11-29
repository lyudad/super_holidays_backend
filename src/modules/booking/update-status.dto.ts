import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Status } from 'models/booking.model';

export class UpdateStatusDto {
  @ApiProperty({ example: 'pending', description: 'Status of vacation' })
  @IsEnum(Status, { message: 'Must be one of enum' })
  status: Status;
}
