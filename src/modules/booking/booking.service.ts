import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BookingDto } from './booking.dto';
import { Booking } from 'models/booking.model';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking) private bookingRepository: typeof Booking,
  ) {}

  async create(dto: BookingDto) {
    const booking = await this.bookingRepository.create({ ...dto });
    return booking;
  }
}
