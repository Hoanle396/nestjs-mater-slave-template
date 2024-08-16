import { registerAs } from '@nestjs/config';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ApplicationConfig {
  @IsNotEmpty()
  @IsNumber()
  port: number;

  @IsNotEmpty()
  @IsString()
  env: string;

  @IsNotEmpty()
  @IsString()
  prefix: string;

  constructor() {
    this.port = Number(process.env.PORT);
    this.env = process.env.NODE_ENV;
    this.prefix = process.env.PREFIX || 'api';
  }
}

export default registerAs<ApplicationConfig>(
  'application',
  () => new ApplicationConfig(),
);
