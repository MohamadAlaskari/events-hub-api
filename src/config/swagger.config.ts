import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";



export function setupSwagger(app: INestApplication) {


    const config = new DocumentBuilder()
    .setTitle('EventHup API')
    .setDescription('API Documentation for the EventHub application')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .build();
    
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory, {
  jsonDocumentUrl: 'swagger/json',});

  
}