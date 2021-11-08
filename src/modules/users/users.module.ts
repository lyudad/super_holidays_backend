import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'models/users.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthModule } from 'modules/auth/auth.module';
import { Booking } from 'models/booking.model';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Booking]),
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],

  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
