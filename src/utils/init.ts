import { validateAllConfigs } from '@/config';
import { Logger } from '@nestjs/common';

export function validateEnvironmentVariables() {
  validateAllConfigs().catch(error => {
    Logger.error(error);
    Logger.warn('Environment validation failed');
    process.exit(1);
  });
}
