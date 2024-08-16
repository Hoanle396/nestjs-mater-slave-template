import { SetMetadata } from '@nestjs/common';
import type { RoleEnum } from 'src/shared/enums';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleEnum[]) => SetMetadata(ROLES_KEY, roles);
