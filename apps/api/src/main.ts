import { AppExceptionFilter, ValidateExceptionFilter } from '@fresha/api/shared/filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { BadRequestException, Logger, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true, logger: true });

  // Swagger
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Fresha Application')
    .setDescription('Fresha - Instantly book salons and spas nearby')
    .setVersion('1.0')
    .addServer('http://localhost:3333/api')
    .addTag('fresha')
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions);

  SwaggerModule.setup('/api/docs', app, swaggerDoc);

  // Middlewares
  app.use(helmet());
  app.use(compression());
  app.use(cookieParser());

  // Global Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true
    })
  );

  // Global Filters
  app.useGlobalFilters(new AppExceptionFilter());
  app.useGlobalFilters(new ValidateExceptionFilter());

  // Configurations
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
