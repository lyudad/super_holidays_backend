import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { User } from 'models/users.model';
import { UsersModule } from 'modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { Booking } from 'models/booking.model';
import { BookingModule } from './modules/booking/booking.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
<<<<<<< HEAD
      password: process.env.DB_PASSWORD,
=======
      password: '',
>>>>>>> dev
      database: process.env.DB_NAME,
      models: [User, Booking],
      autoLoadModels: true,
    }),
    UsersModule,
    AuthModule,
    BookingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
