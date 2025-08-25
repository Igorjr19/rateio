import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { ExtractJwt } from 'passport-jwt';
import { CryptoService } from 'src/modules/crypto/crypto.service';
import { FirebaseService } from 'src/modules/firebase/firebase.service';

@Injectable()
export class FirebaseStrategy extends PassportStrategy(Strategy, 'firebase') {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly cryptoService: CryptoService,
  ) {
    super();
  }

  async validate(payload: any) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(payload);

    try {
      const decodedToken = await this.firebaseService.verifyIdToken(token);

      const customClaims = decodedToken as any;

      if (!customClaims.userId || !customClaims.email || !customClaims.role) {
        throw new UnauthorizedException('Invalid token claims');
      }

      return decodedToken;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
