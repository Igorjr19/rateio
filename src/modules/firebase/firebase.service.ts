import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import * as client from 'firebase/app';
import { FirebaseApp } from 'firebase/app';
import * as admin from 'firebase-admin';
import firebaseConfig, { FirebaseConfig } from 'src/config/firebase.config';

import * as serviceAccount from '../../../secrets/service-account.json';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private app: FirebaseApp;
  private admin: admin.app.App;

  constructor(
    @Inject(firebaseConfig.KEY)
    private readonly config: FirebaseConfig,
  ) {}

  onModuleInit() {
    for (const app of admin.apps) {
      app.delete();
    }

    this.app = client.initializeApp(this.config, 'client');

    this.admin = admin.initializeApp(
      {
        credential: admin.credential.cert(
          serviceAccount as admin.ServiceAccount,
        ),
      },
      'admin',
    );
  }

  getApp(): FirebaseApp {
    return this.app;
  }

  verifyIdToken(token: string) {
    return this.admin.auth().verifyIdToken(token);
  }

  createUser(user: admin.auth.CreateRequest) {
    return this.admin.auth().createUser(user);
  }
}
