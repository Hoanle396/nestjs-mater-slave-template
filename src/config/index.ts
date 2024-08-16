import type { ConfigFactory } from '@nestjs/config';
import type { ClassConstructor } from 'class-transformer';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import application, { ApplicationConfig } from './application.config';
import database, { DatabaseConfig } from './database.config';

async function validateConfig<T extends object>(
  configClass: ClassConstructor<T>,
  config: NodeJS.ProcessEnv,
) {
  const configInstance = plainToClass(configClass, config);
  try {
    await validateOrReject(configInstance);
  } catch (errors) {
    throw new Error(
      `${configClass.name} config validation failed!\nSuggestion: ${errors}`,
    );
  }
}

export async function validateAllConfigs() {
  await validateConfig(ApplicationConfig, process.env);
  await validateConfig(DatabaseConfig, process.env);
}

export const load: ConfigFactory[] = [database, application];

export type StellaConfig = {
  application: ApplicationConfig;
  database: DatabaseConfig;
};
