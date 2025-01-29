import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CommomModule } from 'src/common/common.module';
import { FirebaseService } from 'src/firebase/firebase.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserModule } from 'src/user/user.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FirebaseStrategy } from './strategies/firebase.strategy';

@Module({
  imports: [CommomModule, UserModule, PassportModule, JwtModule],
  providers: [
    AuthService,
    AuthGuard,
    FirebaseService,
    FirebaseStrategy,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
