import { registerAs } from '@nestjs/config';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ApplicationConfig {
  @IsNotEmpty()
  @IsNumber()
  port: number;

  @IsNotEmpty()
  @IsString()
  env: string;

  constructor() {
    this.port = Number(process.env.PORT);
    this.env = process.env.NODE_ENV;
  }
}

export default registerAs<ApplicationConfig>(
  'application',
  () => new ApplicationConfig(),
);
