import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ApiConfig } from './config/api.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const apiConfig = configService.get<ApiConfig>('api');
  const port = apiConfig.port;

  await app.listen(port);
  return port;
}
bootstrap().then((port) => {
  console.log(`Server is running on port ${port}`);
});
