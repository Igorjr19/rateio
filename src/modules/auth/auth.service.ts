import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  getAuth,
  signInWithCustomToken,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import authConfig, { AuthConfig } from 'src/config/auth.config';
import { FirebaseService } from 'src/modules/firebase/firebase.service';

import { CryptoService } from '../crypto/crypto.service';
import { UserIn } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { Session } from './dto/session.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectPinoLogger(AuthService.name)
    private readonly logger: PinoLogger,
    @Inject(authConfig.KEY)
    private readonly authConfig: AuthConfig,
    private readonly firebaseService: FirebaseService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly cryptoService: CryptoService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const anonymizedEmail = await this.anonymizeEmail(email);

    const userCredential = await this.firebaseLogin(anonymizedEmail, password);

    if (!userCredential) {
      throw new UnauthorizedException();
    }

    const firebaseUid = userCredential.user.uid;

    const encryptedEmail = await this.cryptoService.encrypt(email);

    const customClaims = {
      role: user.role,
      userId: user.id,
      email: encryptedEmail,
    };

    const customToken = await this.firebaseService.createCustomToken(
      firebaseUid,
      customClaims,
    );

    const auth = getAuth(this.firebaseService.getApp());
    const customCredential = await signInWithCustomToken(auth, customToken);
    const cleanIdToken = await customCredential.user.getIdToken();

    const decodedToken = this.jwtService.decode(cleanIdToken);
    const expiresIn = parseInt(decodedToken.exp) * 1000;

    const session = new Session({
      token: cleanIdToken,
      expiresIn: expiresIn,
    });

    return session;
  }

  private async firebaseLogin(email: string, password: string) {
    const auth = getAuth(this.firebaseService.getApp());

    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      this.logger.error(`Firebase login failed for email ${email}:`, error);
      return null;
    }
  }

  async signUp(userIn: UserIn): Promise<Session> {
    const anonymizedEmail = await this.anonymizeEmail(userIn.email);

    const existingUser = await this.userService.findByEmail(userIn.email);
    if (existingUser) {
      throw new UnauthorizedException('Error creating user');
    }

    const [firebaseUser, user] = await Promise.all([
      this.firebaseService.createUser({
        email: anonymizedEmail,
        emailVerified: false,
        password: userIn.password,
      }),
      this.userService.create(userIn),
    ]);

    if (!firebaseUser) {
      this.logger.error('Error creating Firebase user');
      throw new UnauthorizedException('Error creating user');
    }

    const encryptedEmail = await this.cryptoService.encrypt(userIn.email);

    const customClaims = {
      role: user.role,
      userId: user.id,
      email: encryptedEmail,
    };

    const customToken = await this.firebaseService.createCustomToken(
      firebaseUser.uid,
      customClaims,
    );

    const auth = getAuth(this.firebaseService.getApp());
    const customCredential = await signInWithCustomToken(auth, customToken);
    const cleanIdToken = await customCredential.user.getIdToken();

    const decodedToken = this.jwtService.decode(cleanIdToken);
    const expiresIn = parseInt(decodedToken.exp) * 1000;

    const session = new Session({
      token: cleanIdToken,
      expiresIn: expiresIn,
    });

    return session;
  }

  private async anonymizeEmail(email: string): Promise<string> {
    const emailHash = this.cryptoService.deterministicHash(email);
    const anonymizedEmail = `${emailHash}@${this.authConfig.signUpEmail}`;

    return anonymizedEmail;
  }
}
