import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

import { User } from './entities/user.entity';

@Injectable()
export class UserRepository extends EntityRepository<User> {
  async findByEmail(email: string): Promise<User> {
    return this.findOne({ email });
  }
}
