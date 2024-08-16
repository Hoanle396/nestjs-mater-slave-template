import { validateAllConfigs } from '@/config';
import { Logger } from '@nestjs/common';

export function validateEnvironmentVariables() {
  validateAllConfigs().catch(error => {
    Logger.error('Environment validation failed', error);
    process.exit(1);
  });
}
