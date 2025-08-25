import '../util/env.loader';

import { Module } from '@nestjs/common';
import { ConfigModule as BaseConfigModule } from '@nestjs/config';

import apiConfig from './api.config';
import authConfig from './auth.config';
import databaseConfig from './database.config';
import firebaseConfig from './firebase.config';

@Module({
  imports: [
    BaseConfigModule.forRoot({
      isGlobal: true,
      load: [apiConfig, authConfig, firebaseConfig, databaseConfig],
    }),
  ],
  exports: [BaseConfigModule],
})
export class ConfigModule {}
