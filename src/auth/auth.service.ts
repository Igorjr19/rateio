import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseService } from 'src/firebase/firebase.service';
import { UserService } from 'src/user/user.service';

import { SessionDto } from './dto/session.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const userCredential = await this.firebaseLogin(email, password);

    if (!userCredential) {
      throw new UnauthorizedException();
    }

    const firebaseToken = await userCredential.user.getIdToken();

    const decodedToken = this.jwtService.decode(firebaseToken);
    const expiresIn = parseInt(decodedToken.exp) * 1000;

    const session = new SessionDto({
      token: firebaseToken,
      expiresIn: expiresIn,
    });

    return session;
  }

  async firebaseLogin(email: string, password: string) {
    const auth = getAuth(this.firebaseService.getApp());

    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
    return null;
  }
}
