// eslint-disable-next-line simple-import-sort/imports
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as client from 'firebase/app';
import { FirebaseApp } from 'firebase/app';
import firebaseConfig, { FirebaseConfig } from 'src/config/firebase.config';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private app: FirebaseApp;
  private admin: admin.app.App;

  constructor(
    @Inject(firebaseConfig.KEY)
    private readonly config: FirebaseConfig,
  ) {}

  async onModuleInit() {
    for (const app of admin.apps) {
      await app.delete();
    }

    this.app = client.initializeApp(this.config, 'client');

    const serviceAccount = JSON.parse(
      Buffer.from(this.config.serviceAccount, 'base64').toString('utf-8'),
    );

    this.admin = admin.initializeApp(
      {
        credential: admin.credential.cert(serviceAccount),
      },
      'admin',
    );
  }

  getApp(): FirebaseApp {
    return this.app;
  }

  async verifyIdToken(token: string) {
    return await this.admin.auth().verifyIdToken(token);
  }

  async createUser(user: admin.auth.CreateRequest) {
    try {
      return await this.admin.auth().createUser(user);
    } catch (error) {
      return null;
    }
  }

  async deleteUser(uid: string) {
    return await this.admin.auth().deleteUser(uid);
  }

  async createCustomToken(uid: string, customClaims?: object) {
    return await this.admin.auth().createCustomToken(uid, customClaims);
  }

  async setCustomUserClaims(uid: string, customClaims: object) {
    return await this.admin.auth().setCustomUserClaims(uid, customClaims);
  }

  async getUserByEmail(email: string) {
    try {
      return await this.admin.auth().getUserByEmail(email);
    } catch (error) {
      return null;
    }
  }
}
