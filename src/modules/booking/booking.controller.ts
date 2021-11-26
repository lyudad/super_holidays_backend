import {
  Body,
  Controller,
  Post,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { Booking } from 'models/booking.model';
import { CreateBookingDto } from './create-booking.dto';
import { UpdateBookingDto } from './update-booking.dto';
import { BookingService } from './booking.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'modules/auth/jwt-auth.guard';

@ApiTags('Booking')
@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @ApiOperation({ summary: 'Create booking' })
  @ApiResponse({ status: 200, type: Booking })
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateBookingDto) {
    return this.bookingService.create(dto);
  }

  @ApiOperation({ summary: 'Update booking' })
  @ApiResponse({ status: 200, type: Booking })
  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  updateBooking(@Param('id') id: number, @Body() dto: UpdateBookingDto) {
    return this.bookingService.updateBooking(id, dto);
  }
}
