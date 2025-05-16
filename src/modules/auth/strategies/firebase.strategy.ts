import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { ExtractJwt } from 'passport-jwt';
import { FirebaseService } from 'src/modules/firebase/firebase.service';

@Injectable()
export class FirebaseStrategy extends PassportStrategy(Strategy, 'firebase') {
  constructor(private readonly firebaseService: FirebaseService) {
    super();
  }

  async validate(payload: any) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(payload);

    try {
      return await this.firebaseService.verifyIdToken(token);
    } catch {
      throw new UnauthorizedException();
    }
  }
}
