import { AppModule } from '@/app.module';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Tech 5 star API')
    .setDescription('Tech 5 star API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000).then(() => {
    Logger.verbose(
      `${new Date()}`,
      'Application started at port ' + process.env.PORT || 3000,
    );
  });
}
bootstrap();
