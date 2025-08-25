import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { ExtractJwt } from 'passport-jwt';
import { CryptoService } from 'src/modules/crypto/crypto.service';
import { FirebaseService } from 'src/modules/firebase/firebase.service';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class FirebaseStrategy extends PassportStrategy(Strategy, 'firebase') {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly cryptoService: CryptoService,
    private readonly userService: UserService,
  ) {
    super();
  }

  async validate(payload: any) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(payload);

    try {
      const decodedToken = await this.firebaseService.verifyIdToken(token);

      const customClaims = decodedToken as any;

      if (
        !customClaims.user_id ||
        !customClaims.document ||
        !customClaims.role
      ) {
        throw new UnauthorizedException('Invalid token claims');
      }

      const { document } = customClaims;
      const decryptedDocument = await this.cryptoService.decrypt(document);

      const user = await this.userService.findByDocument(decryptedDocument);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const { updatedAt, createdAt, ...rest } = user;

      return rest;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
