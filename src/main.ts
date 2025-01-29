import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import type { ApiConfig } from './config/api.config';
import { swaggerConfig } from './config/swagger.config';
import { ValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const apiConfig = configService.get<ApiConfig>('api');
  const port = apiConfig.port;

  app.useGlobalPipes(new ValidationPipe());

  swaggerConfig(app, apiConfig);

  await app.listen(port);

  return port;
}
bootstrap().then((port) => {
  console.log(`Server is running on port ${port}`);
});
