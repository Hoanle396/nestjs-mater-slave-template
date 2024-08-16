import { AppModule } from '@/app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { validateEnvironmentVariables } from './utils/init';

async function bootstrap() {
  validateEnvironmentVariables();

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const logger = new Logger('Tech5star');
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Tech 5 star API')
    .setDescription('Tech 5 star API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(configService.get('application.port')).then(() => {
    logger.log('Start at port ' + configService.get('application.port'));
  });
}
bootstrap();
