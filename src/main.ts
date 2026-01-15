import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Bookmark Manager API')
    .setDescription(
      'API for managing bookmarks from various social platforms (XHS, Facebook, Instagram, etc.). This API allows users to create, read, update, and delete their bookmarks.',
    )
    .setVersion('1.0')
    .addServer('http://localhost:3000', 'Local Development')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'x-user-id',
        in: 'header',
        description: 'User ID for authentication (demo/development only)',
      },
      'x-user-id',
    )
    .addTag('bookmarks', 'Bookmark management endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
