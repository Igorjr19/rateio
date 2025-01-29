import { registerAs } from '@nestjs/config';

export const apiConfigFactory = () => ({
  name: process.env.API_NAME ?? 'API',
  port: process.env.API_PORT ?? 3000,
  version: process.env.API_VERSION ?? '1.0',
});

export type ApiConfig = ReturnType<typeof apiConfigFactory>;

export default registerAs('api', apiConfigFactory);
