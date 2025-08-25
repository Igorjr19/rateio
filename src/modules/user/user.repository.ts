import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

import { UserIn } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository extends EntityRepository<User> {
  async findByEmail(email: string): Promise<User> {
    return this.findOne({ email });
  }

  async createUser(userIn: UserIn): Promise<User> {
    const user = this.create(userIn);
    await this.em.persistAndFlush(user);
    return user;
  }
}
