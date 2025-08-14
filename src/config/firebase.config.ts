import { registerAs } from '@nestjs/config';
import { getEnvOrDefault, getEnvOrThrow } from 'src/util/env.util';

const serviceAccount = getEnvOrThrow('FIREBASE_SERVICE_ACCOUNT');
const apiKey = getEnvOrThrow('FIREBASE_API_KEY');
const projectId = getEnvOrThrow('FIREBASE_PROJECT_ID');
const authDomain = `${projectId}.firebaseapp.com`;
const storageBucket = `${projectId}.appspot.com`;
const messagingSenderId = getEnvOrThrow('FIREBASE_MESSAGING_SENDER_ID');
const appId = getEnvOrThrow('FIREBASE_APP_ID');
const measurementId = getEnvOrDefault('FIREBASE_MEASUREMENT_ID', '');

export const firebaseConfigFactory = () => ({
  serviceAccount,
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
});

export type FirebaseConfig = ReturnType<typeof firebaseConfigFactory>;

export default registerAs('firebase', firebaseConfigFactory);
