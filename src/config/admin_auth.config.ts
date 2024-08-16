import { registerAs } from '@nestjs/config';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class AdminAuthConfig {
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  accessTokenSecret: string;

  @IsNotEmpty()
  @IsNumber()
  accessTokenLifetime: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  refreshTokenSecret: string;

  @IsNotEmpty()
  @IsNumber()
  refreshTokenLifetime: number;

  constructor() {
    this.accessTokenSecret = process.env.ADMIN_ACCESS_TOKEN_SECRET;
    this.accessTokenLifetime = Number(process.env.ADMIN_ACCESS_TOKEN_LIFETIME);
    this.refreshTokenSecret = process.env.ADMIN_REFRESH_TOKEN_SECRET;
    this.refreshTokenLifetime = Number(
      process.env.ADMIN_REFRESH_TOKEN_LIFETIME,
    );
  }
}

export default registerAs<AdminAuthConfig>(
  'adminAuth',
  () => new AdminAuthConfig(),
);
