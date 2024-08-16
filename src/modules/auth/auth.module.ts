import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Admin, OTPCode, User } from '@/databases/entities';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthHelperService } from './auth_helper.service';
import { HashService } from './hash.service';
import { MyJwtService } from './jwt.service';
import { AdminJwtStrategy } from './strategies/admin_jwt.strategy';
import { AdminJwtRefreshTokenStrategy } from './strategies/admin_jwt_refresh_token.strategy';
import { UserJwtStrategy } from './strategies/user_jwt.strategy';
import { UserJwtRefreshTokenStrategy } from './strategies/user_jwt_refresh_token.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Admin, OTPCode]),
    JwtModule.register({}),
    UserModule,
  ],
  providers: [
    AuthHelperService,
    MyJwtService,
    AuthService,
    HashService,
    AdminJwtStrategy,
    AdminJwtRefreshTokenStrategy,
    UserJwtStrategy,
    UserJwtRefreshTokenStrategy,
  ],
  controllers: [AuthController],
  exports: [MyJwtService],
})
export class AuthModule {}
