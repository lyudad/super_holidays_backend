import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'models/users.model';
import { BookingController } from './booking.controller';
import { Booking } from 'models/booking.model';
import { BookingService } from './booking.service';
import { Session } from 'models/session.model';
import { AuthModule } from 'modules/auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([User, Session, Booking]),
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
