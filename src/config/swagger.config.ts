import type { INestApplication } from '@nestjs/common';
import type { SwaggerCustomOptions } from '@nestjs/swagger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import type { ApiConfig } from './api.config';

export const swaggerConfig = (app: INestApplication, apiConfig: ApiConfig) => {
  const openApiConfig = new DocumentBuilder()
    .setTitle(apiConfig.name)
    .setDescription(`${apiConfig.name} API description`)
    .setVersion(apiConfig.version)
    .addBearerAuth()
    .build();

  const documentFactory = () => {
    return SwaggerModule.createDocument(app, openApiConfig);
  };

  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: apiConfig.name,
  };

  SwaggerModule.setup('swagger', app, documentFactory, customOptions);
};
