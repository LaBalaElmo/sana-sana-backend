import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle("Sana Sana")
    .setDescription('API de la aplicación Sana Sana')
    .setVersion('1.0')
    .addTag('SanaSana')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
