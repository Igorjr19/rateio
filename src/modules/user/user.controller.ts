import { Controller, Get, UseFilters, UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorators/role.decorator';
import { ReqUser } from 'src/decorators/user.decorator';
import { MultiRoleRouteFilter } from 'src/filters/roles.filter';
import { RolesGuard } from 'src/guards/roles.guard';

import { User } from './entities/user.entity';
import { Role } from './enum/role.enum';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @Roles(Role.ADMIN)
  @UseFilters(MultiRoleRouteFilter)
  async list() {
    return this.userService.list();
  }

  @Get('')
  @Roles(Role.USER)
  @UseFilters(MultiRoleRouteFilter)
  async getCurrentUser(@ReqUser() user: User) {
    return user;
  }
}
