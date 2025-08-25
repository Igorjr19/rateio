import { SetMetadata } from '@nestjs/common';
import type { Role } from 'src/modules/user/enum/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (role: Role) => SetMetadata(ROLES_KEY, role);
