import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { Cat } from '../databases/entities/cat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cat])],
  controllers: [CatController],
  providers: [CatService],
})
export class CatModule {}
