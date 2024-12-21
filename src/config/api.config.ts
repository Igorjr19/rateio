import { registerAs } from '@nestjs/config';

export const apiConfigFactory = () => ({
  port: process.env.PORT ?? 3000,
});

export type ApiConfig = ReturnType<typeof apiConfigFactory>;

export default registerAs('api', apiConfigFactory);
