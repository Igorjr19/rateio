import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommomModule } from './common/common.module';
import apiConfig from './config/api.config';
import firebaseConfig from './config/firebase.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [apiConfig, firebaseConfig],
    }),
    CommomModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
