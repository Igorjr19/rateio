import { Injectable } from '@nestjs/common';

import { UserIn } from './dto/user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async create(user: UserIn) {
    return this.userRepository.create(user);
  }
}
