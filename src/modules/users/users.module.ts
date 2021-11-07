import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'models/users.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Role } from 'models/roles.model';
import { UserRoles } from 'modules/userRoles/user-role.model';
import { RolesModule } from 'modules/roles/roles.module';
import { AuthModule } from 'modules/auth/auth.module';
import { Booking } from 'models/booking.model';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Booking]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],

  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
