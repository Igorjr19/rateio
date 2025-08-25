import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';
import type { ApiConfig } from './config/api.config';
import { swaggerConfig } from './config/swagger.config';
import { ValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });

  const logger = app.get(Logger);
  app.useLogger(logger);

  const configService = app.get(ConfigService);
  const apiConfig = configService.get<ApiConfig>('api');
  const port = apiConfig.port;

  app.useGlobalPipes(new ValidationPipe());

  swaggerConfig(app, apiConfig);

  await app.listen(port);

  logger.log(`Server is running on port ${port}`, 'Bootstrap');

  return port;
}

bootstrap().catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});
