import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'models/roles.model';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { User } from 'models/users.model';
import { UserRoles } from 'modules/userRoles/user-role.model';

@Module({
  imports: [SequelizeModule.forFeature([Role, User, UserRoles])],
  exports: [RolesService],
  providers: [RolesService],
  controllers: [RolesController],
})
export class RolesModule {}
