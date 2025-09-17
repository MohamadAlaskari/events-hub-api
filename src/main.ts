import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';

import { join } from 'path';

import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Swagger setup
   

  setupSwagger(app);

    // Statische Swagger-UI Files bereitstellen
  app.use(
    '/swagger',
    express.static(join(__dirname, '../node_modules/swagger-ui-dist')),
  )
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
