import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { User } from 'models/users.model';
import { UsersModule } from 'modules/users/users.module';
import { Role } from 'models/roles.model';
import { RolesModule } from './modules/roles/roles.module';
import { UserRoles } from 'modules/userRoles/user-role.model';
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
      host: process.env.HOST,
      port: Number(process.env.PORT),
      username: process.env.USER,
      password: '',
      database: process.env.DB,
      models: [User, Role, UserRoles, Booking],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    BookingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
