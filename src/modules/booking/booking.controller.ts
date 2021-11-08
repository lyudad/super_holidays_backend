import { Body, Controller, Post } from '@nestjs/common';
import { BookingDto } from './booking.dto';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post()
  createBooking(@Body() dto: BookingDto) {
    return this.bookingService.create(dto);
  }
}
