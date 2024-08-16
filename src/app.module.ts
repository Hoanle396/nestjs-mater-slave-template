import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CatModule } from './cat/cat.module';
import { load } from './config';
import { OrmModule } from './orm.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load,
    }),
    OrmModule,
    CatModule,
  ],
})
export class AppModule {}
