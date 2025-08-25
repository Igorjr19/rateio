import { Controller, Get } from '@nestjs/common';
import { User as UserDecorator } from 'src/decorators/user.decorator';

import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  @Get()
  async getUsers() {}

  @Get('me')
  async getCurrentUser(@UserDecorator() user: User) {
    return user;
  }
}
