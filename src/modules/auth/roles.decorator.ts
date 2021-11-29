import { SetMetadata } from '@nestjs/common';
import { Role } from 'models/users.model';

export const hasRoles = (...hasRoles: Role[]) => SetMetadata('roles', hasRoles);
