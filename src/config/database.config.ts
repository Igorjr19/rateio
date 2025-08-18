import { registerAs } from '@nestjs/config';
import { getEnvOrDefault, getEnvOrThrow } from 'src/util/env.util';

const host = getEnvOrDefault('POSTGRES_HOST', 'localhost');
const name = getEnvOrDefault('POSTGRES_NAME', 'postgres');
const user = getEnvOrDefault('POSTGRES_USER', 'postgres');
const password = getEnvOrThrow('POSTGRES_PASSWORD');
const port = Number(getEnvOrDefault('POSTGRES_PORT', '5432'));

export const databaseConfigFactory = () => ({
  host,
  name,
  user,
  password,
  port,
});

export type DatabaseConfig = ReturnType<typeof databaseConfigFactory>;

export default registerAs('database', databaseConfigFactory);
