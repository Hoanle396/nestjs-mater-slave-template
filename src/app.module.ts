import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CatModule } from './cat/cat.module';
import { AppConfigModule } from './config/config.module';
import { AppConfigService } from './config/config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: async (
        configService: AppConfigService,
      ): Promise<TypeOrmModuleOptions> => configService.getDataSourceOptions(),
      inject: [AppConfigService],
    }),
    CatModule,
  ],
})
export class AppModule {}
