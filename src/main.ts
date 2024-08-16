import { AppModule } from '@/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { rateLimit, validateEnvironmentVariables } from './utils/init';

async function bootstrap() {
  validateEnvironmentVariables();

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    bufferLogs: true,
  });

  const logger = new Logger('Tech5star');
  const configService = app.get(ConfigService);

  app.setGlobalPrefix(configService.get('application.prefix'));

  if (configService.get('application.env') !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Tech 5 star API')
      .setDescription('Tech 5 star API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.use(helmet());
  app.use(rateLimit);

  await app.listen(configService.get('application.port')).then(() => {
    logger.log('Start at port ' + configService.get('application.port'));
  });
}
bootstrap();
