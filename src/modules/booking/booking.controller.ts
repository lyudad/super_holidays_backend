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
import { UpdateStatusDto } from './update-status.dto';
import { hasRoles } from 'modules/auth/roles.decorator';
import { RolesGuard } from 'modules/auth/roles.guard';
import { Role } from 'models/users.model';

@ApiTags('Booking')
@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @ApiOperation({ summary: 'Create booking' })
  @ApiResponse({ status: 200, type: Booking })
  @UseGuards(JwtAuthGuard)
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

  @ApiOperation({ summary: 'Update status' })
  @ApiResponse({ status: 200, type: Booking })
  @Patch('/:id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(Role.ADMIN) // SUPER
  updateStatus(@Param('id') id: number, @Body() dto: UpdateStatusDto) {
    return this.bookingService.updateStatus(id, dto);
  }
}
