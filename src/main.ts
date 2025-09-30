import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';

import { join } from 'path';

import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './common/filters/glopal-Exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  // Enable CORS for all origins 
  app.enableCors();

  // activate global HTTP exception filter 
  app.useGlobalFilters(new GlobalExceptionFilter());

  
  // activate validation globally for all incoming requests 
  app.useGlobalPipes(new ValidationPipe());
  
  // Swagger setup for API documentation
  setupSwagger(app);

  // Prepare static assets for swagger UI, since swagger module does not do it automatically: its important for vercel deployment 
  app.use(
    '/swagger',
    express.static(join(__dirname, '../node_modules/swagger-ui-dist')),
  ) 
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
