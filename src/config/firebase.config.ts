import { registerAs } from '@nestjs/config';

export const firebaseConfigFactory = () => ({
  serviceAccount: process.env.FIREBASE_SERVICE_ACCOUNT,
  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
  authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
  storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID ?? '',
});

export type FirebaseConfig = ReturnType<typeof firebaseConfigFactory>;

export default registerAs('firebase', firebaseConfigFactory);
