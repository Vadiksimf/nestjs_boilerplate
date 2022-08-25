import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  console.log('ENVIRONMENT', process.env.NODE_ENV);
  const port = config.get('app').port;
  const name = config.get('app').name;

  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle(name)
    .setDescription(name)
    .setVersion('1.0')
    .addTag(name)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  process.on('unhandledRejection', (e) => {
    console.log('ERROR', e);
  });
}
bootstrap();
