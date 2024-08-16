import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators/user.decorator';
import type { TokensType } from 'src/shared/types';
import { JwtPayloadType } from 'src/shared/types';

import { AuthService } from './auth.service';
import { AuthHelperService } from './auth_helper.service';
import { ValidateUserByPasswordDto } from './dto/user.validate';
import { CreateUserByPasswordDto } from './dto/user_basic.create';
import { UserJwtRefreshTokenGuard } from './guards/user_jwt_refresh_token.guard';

@ApiTags('auth')
@Controller('')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authHelperService: AuthHelperService,
  ) {}

  @ApiOperation({ summary: 'Register as user' })
  @Post('users')
  async registerAsUser(@Body() dto: CreateUserByPasswordDto) {
    return await this.authService.createUser(dto);
  }

  @ApiOperation({ summary: 'Login as user' })
  @Post('users/login')
  async loginAsUser(@Body() dto: ValidateUserByPasswordDto) {
    return await this.authService.validateUser(dto);
  }

  @ApiOperation({ summary: 'Refresh token as user. Please use refresh token' })
  @ApiBearerAuth()
  @Get('user/refresh-token')
  @UseGuards(UserJwtRefreshTokenGuard)
  async refreshTokenAsUser(
    @GetUser() user: JwtPayloadType,
  ): Promise<TokensType> {
    return await this.authHelperService.refreshTokenAsUser(user);
  }
}
