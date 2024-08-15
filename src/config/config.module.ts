import { Module } from '@nestjs/common';
import { AppConfigService } from './config.service';

@Module({
  providers: [
    {
      provide: AppConfigService,
      useValue: new AppConfigService('.env'),
    },
  ],
  exports: [AppConfigService],
})
export class AppConfigModule {}
