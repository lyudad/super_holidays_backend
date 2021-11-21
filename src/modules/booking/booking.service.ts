import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBookingDto } from './create-booking.dto';
import { UpdateBookingDto } from './update-booking.dto';
import { Booking } from 'models/booking.model';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking) private bookingRepository: typeof Booking,
  ) {}

  async create(dto: CreateBookingDto) {
    try {
      const booking = await this.bookingRepository.create({ ...dto });
      return booking;
    } catch (e) {
      console.log(e.message);
    }
  }

  async getAllBooking() {
    const booking = await this.bookingRepository.findAll({
      include: { all: true },
    });
    return booking;
  }

  async updateBooking(id: number, dto: UpdateBookingDto) {
    try {
      const booking = await this.bookingRepository.findOne({
        where: { id },
      });
      if (!booking) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      return this.bookingRepository.update(dto, { where: { id } });
    } catch (error) {
      console.log(error);
    }
  }
}
