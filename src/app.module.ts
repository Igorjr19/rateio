import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './modules/common/common.module';
import { DatabaseModule } from './modules/database/database.module';
import { LoggerModule } from './modules/logger/logger.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    CommonModule,
    DatabaseModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
