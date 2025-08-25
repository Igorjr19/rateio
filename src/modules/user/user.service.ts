import { Injectable } from '@nestjs/common';

import { UserIn } from './dto/user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }

  async findByDocument(document: string) {
    return await this.userRepository.findByDocument(document);
  }

  async create(user: UserIn) {
    return await this.userRepository.createUser(user);
  }

  async list() {
    return this.userRepository.findAll();
  }
}
