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
      return {
        id: booking.id,
        start_day: booking.start_day,
        end_day: booking.end_day,
        type: booking.type,
        status: booking.status,
        userId: booking.userId,
      };
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
      const updatedBooking = await this.bookingRepository.findOne({
        where: { id },
      });
      return {
        id: updatedBooking.id,
        start_day: updatedBooking.start_day,
        end_day: updatedBooking.end_day,
        type: updatedBooking.type,
        status: updatedBooking.status,
        userId: updatedBooking.userId,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getCurrentBooking(id: number) {
    try {
      const booking = await this.bookingRepository.findAll({
        where: { userId: id },
        include: { all: true },
      });
      const result = booking.map((e) => {
        return {
          id: e.id,
          start_day: e.start_day,
          end_day: e.end_day,
          type: e.type,
          status: e.status,
          userId: e.userId,
        };
      });
      return result;
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
      const booking = await this.bookingRepository.findOne({
        where: { id },
      });
      return {
        id: booking.id,
        start_day: booking.start_day,
        end_day: booking.end_day,
        type: booking.type,
        status: booking.status,
        userId: booking.userId,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
