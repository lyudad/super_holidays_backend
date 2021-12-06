import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CreateBookingDto } from './create-booking.dto';
import { UpdateBookingDto } from './update-booking.dto';
import { BookingService } from './booking.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'modules/auth/jwt-auth.guard';
import { UpdateStatusDto } from './update-status.dto';
import { hasRoles } from 'modules/auth/roles.decorator';
import { RolesGuard } from 'modules/auth/roles.guard';
import { Role } from 'models/users.model';
import { GetAllUserResponseDates } from 'modules/users/types-api-user.dto';

@ApiTags('Booking')
@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @ApiOperation({ summary: 'Create booking' })
  @ApiResponse({ status: 200, type: GetAllUserResponseDates })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateBookingDto) {
    return this.bookingService.create(dto);
  }
  @ApiOperation({ summary: 'Get user bookings by id' })
  @ApiResponse({ status: 200, type: [GetAllUserResponseDates] })
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getCurrentBooking(@Param('id') id: number) {
    return this.bookingService.getCurrentBooking(id);
  }

  @ApiOperation({ summary: 'Update booking' })
  @ApiResponse({ status: 200, type: GetAllUserResponseDates })
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  updateBooking(@Param('id') id: number, @Body() dto: UpdateBookingDto) {
    return this.bookingService.updateBooking(id, dto);
  }

  @ApiOperation({ summary: 'Update status' })
  @ApiResponse({ status: 200, type: GetAllUserResponseDates })
  @Patch('/:id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(Role.ADMIN || Role.SUPER)
  updateStatus(@Param('id') id: number, @Body() dto: UpdateStatusDto) {
    return this.bookingService.updateStatus(id, dto);
  }
}
