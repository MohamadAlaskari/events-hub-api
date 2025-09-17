import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { join } from 'path';
import * as express from 'express';


export function setupSwagger(app: INestApplication) {


    const config = new DocumentBuilder()
    .setTitle('EventHup API')
    .setDescription('API Documentation for the EventHub application')
    .setVersion('1.0')
    //.addTag('EventHub')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory, {
  jsonDocumentUrl: 'swagger/json',});

   // static files for swagger-ui-dist
  app.use(
    '/swagger',
    express.static(join(__dirname, '../node_modules/swagger-ui-dist')),
  )
}