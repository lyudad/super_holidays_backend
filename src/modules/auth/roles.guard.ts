import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role, User } from 'models/users.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    if (user.roles === Role.ADMIN) {
      return true;
    }
    return false;

    // return await this.userRepository.findOne({ where: { id: user.id } }).pipe(
    //   map((user: User) => {
    //     const hasRole = () => roles.indexOf(user.roles) > -1;
    //     let hasPermission = false;
    //     console.log(hasRole);

    //     if (hasRole()) {
    //       console.log('hasRole TRUE');
    //       hasPermission = true;
    //     }
    //     return user && hasPermission;
    //   }),
    // );
  }
}
