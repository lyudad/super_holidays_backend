import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'models/users.model';
import { BookingController } from './booking.controller';
import { Booking } from 'models/booking.model';
import { BookingService } from './booking.service';

@Module({
  imports: [SequelizeModule.forFeature([User, Booking])],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
