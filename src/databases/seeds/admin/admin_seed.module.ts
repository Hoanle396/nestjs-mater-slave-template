import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminSeedService } from './admin_seed.service';
import { Admin } from '@/databases/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  providers: [AdminSeedService],
  exports: [AdminSeedService],
})
export class AdminSeedModule {}
