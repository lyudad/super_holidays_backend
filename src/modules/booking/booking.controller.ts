import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Param,
  Patch,
} from '@nestjs/common';
import { Booking } from 'models/booking.model';
import { CreateBookingDto } from './create-booking.dto';
import { UpdateBookingDto } from './update-booking.dto';
import { BookingService } from './booking.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Booking')
@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @ApiOperation({ summary: 'Create booking' })
  @ApiResponse({ status: 200, type: Booking })
  @Post()
  create(@Body() dto: CreateBookingDto) {
    return this.bookingService.create(dto);
  }

  @ApiOperation({ summary: 'Get all booking' })
  @ApiResponse({ status: 200, type: [Booking] })
  @Get()
  getAll() {
    return this.bookingService.getAllBooking();
  }

  @ApiOperation({ summary: 'Update booking' })
  @ApiResponse({ status: 200, type: [Booking] })
  @Patch('/:id')
  updateBooking(@Param('id') id: number, @Body() dto: UpdateBookingDto) {
    return this.bookingService.updateBooking(id, dto);
  }
}
