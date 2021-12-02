import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum } from 'class-validator';
import { VacationType } from 'models/booking.model';

export class UpdateBookingDto {
  @ApiProperty({ example: '2020-11-02', description: 'Start day' })
  // @Type(() => Date)
  // @IsDate({ message: 'Must be a date' })
  start_day: string;

  @ApiProperty({ example: '2020-11-15', description: 'End day' })
  // @Type(() => Date)
  // @IsDate({ message: 'Must be a date' })
  end_day: string;

  @ApiProperty({ example: 'vacation', description: 'Type of vacation' })
  @IsEnum(VacationType, { message: 'Must be one of enum' })
  type: VacationType;
}
