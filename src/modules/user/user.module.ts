import { Module } from '@nestjs/common';

import { CommonModule } from '../common/common.module';
import { DatabaseEntities } from '../database/database.module';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [CommonModule, DatabaseEntities([User])],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
