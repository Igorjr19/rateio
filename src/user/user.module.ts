import { Module } from '@nestjs/common';
import { CommomModule } from 'src/common/common.module';

import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [CommomModule],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
