import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBookingDto } from './create-booking.dto';
import { UpdateBookingDto } from './update-booking.dto';
import { Booking } from 'models/booking.model';
import { UpdateStatusDto } from './update-status.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking) private bookingRepository: typeof Booking,
  ) {}

  async create(dto: CreateBookingDto) {
    try {
      const booking = await this.bookingRepository.create(dto);
      return booking;
    } catch (e) {
      console.log(e.message);
    }
  }

  async updateBooking(id: number, dto: UpdateBookingDto) {
    try {
      const booking = await this.bookingRepository.findOne({
        where: { id },
      });
      if (!booking) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      await this.bookingRepository.update(dto, { where: { id } });
      return await this.bookingRepository.findOne({
        where: { id },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateStatus(id: number, dto: UpdateStatusDto) {
    try {
      const user = await this.bookingRepository.findOne({
        where: { id },
      });
      if (!user) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      await this.bookingRepository.update(dto, { where: { id } });
      return await this.bookingRepository.findOne({
        where: { id },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
