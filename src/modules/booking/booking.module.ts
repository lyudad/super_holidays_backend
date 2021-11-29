import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'models/users.model';
import { BookingController } from './booking.controller';
import { AuthModule } from 'modules/auth/auth.module';
import { Booking } from 'models/booking.model';
import { BookingService } from './booking.service';
import { Session } from 'models/session.model';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Booking, Session]),
    forwardRef(() => AuthModule),
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
