import { Module } from '@nestjs/common';
import { ConfigModule as BaseConfigModule } from '@nestjs/config';

import apiConfig from './api.config';
import firebaseConfig from './firebase.config';

@Module({
  imports: [
    BaseConfigModule.forRoot({
      isGlobal: true,
      load: [apiConfig, firebaseConfig],
    }),
  ],
  exports: [BaseConfigModule],
})
export class ConfigModule {}
