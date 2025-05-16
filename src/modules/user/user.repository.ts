import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

import { UserIn } from './dto/user.dto';
import { UserError } from './user.error';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(user: UserIn) {
    const existingUser = await this.prismaService.user.findFirst({
      where: {
        OR: [{ phone: user.phone }, { email: user.email }],
      },
    });

    if (existingUser) {
      throw new BadRequestException(UserError.UserAlreadyExists);
    }

    return this.prismaService.user.create({
      data: {
        email: user.email,
        name: user.name,
        birthdate: user.birthdate,
        phone: user.phone,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }
}
