import { Module } from '@nestjs/common';
import { CommonModule } from 'src/modules/common/common.module';

import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [CommonModule],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
