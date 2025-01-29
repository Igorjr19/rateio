import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { FirebaseApp, initializeApp } from 'firebase/app';
import firebaseConfig, { FirebaseConfig } from 'src/config/firebase.config';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private app: FirebaseApp;

  constructor(
    @Inject(firebaseConfig.KEY)
    private readonly config: FirebaseConfig,
  ) {}

  onModuleInit() {
    this.app = initializeApp(this.config);
  }

  getApp(): FirebaseApp {
    return this.app;
  }
}
