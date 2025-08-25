import { registerAs } from '@nestjs/config';
import { getEnvOrThrow } from 'src/util/env.util';

const cryptoKey = getEnvOrThrow('AUTH_CRYPTO_KEY');
const signUpEmail = getEnvOrThrow('AUTH_SIGNUP_EMAIL');

export const authConfigFactory = () => ({
  cryptoKey,
  signUpEmail,
});

export type AuthConfig = ReturnType<typeof authConfigFactory>;

export default registerAs('auth', authConfigFactory);
