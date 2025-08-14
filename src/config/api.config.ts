import { registerAs } from '@nestjs/config';
import { getEnvOrDefault } from 'src/util/env.util';

const name = getEnvOrDefault('API_NAME', 'API');
const port = Number(getEnvOrDefault('API_PORT', '3000'));
const version = getEnvOrDefault('API_VERSION', '1.0');

export const apiConfigFactory = () => ({
  name,
  port,
  version,
});

export type ApiConfig = ReturnType<typeof apiConfigFactory>;

export default registerAs('api', apiConfigFactory);
