import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  async base(): Promise<string> {
    return 'The application is up and running!';
  }
}
