import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AdminSeedService } from './admin/admin_seed.service';
import { SeedModule } from './seed.module';

const logger = new Logger('Seed');

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  await app.get(AdminSeedService).bootstrap();

  await app.close();
  logger.log('Seed successfully!');
};

void runSeed();
