import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsEnum } from 'class-validator';
import { VacationType, Status } from 'models/booking.model';

export class CreateBookingDto {
  @ApiProperty({ example: '2020-11-02', description: 'Start day' })
  readonly start_day: string;

  @ApiProperty({ example: '2020-11-15', description: 'End day' })
  readonly end_day: string;

  @ApiProperty({ example: 'vacation', description: 'Type of vacation' })
  @IsEnum(VacationType, { message: 'Must be one of enum' })
  type: VacationType;

  @ApiProperty({ example: 'pending', description: 'Status of vacation' })
  @IsEnum(Status, { message: 'Must be one of enum' })
  status: Status;

  @ApiProperty({ example: '5', description: 'Id of user' })
  @IsNumber({}, { message: 'Must be a number' })
  readonly userId: number;
}
