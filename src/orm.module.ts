import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

import entities from './databases';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get('database.type'),
          replication: configService.get('database.replication'),
          entities,
          synchronize: configService.get('database.synchronize'),
          migrations: ['./database/migrations/*{.ts,.js}'],
          logging: configService.get('database.logging'),
          autoLoadEntities: true,
        } as TypeOrmModuleAsyncOptions;
      },
    }),
  ],
})
export class OrmModule {}
