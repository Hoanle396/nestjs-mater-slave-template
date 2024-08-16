import { Injectable } from '@nestjs/common';
import type { JwtPayloadType, TokensType } from 'src/shared/types';

import { MyJwtService } from './jwt.service';
import { Admin, User } from '@/databases/entities';

@Injectable()
export class AuthHelperService {
  constructor(private readonly jwtService: MyJwtService) {}

  /**
   * Create Token
   */
  async createTokensAsUser(user: User): Promise<TokensType> {
    const tokens = await this.jwtService.signUserTokens({
      id: String(user.id),
    });

    return tokens;
  }

  async createTokensAsAdmin(admin: Admin): Promise<TokensType> {
    const tokens = await this.jwtService.signAdminTokens({
      id: String(admin.id),
    });

    return tokens;
  }

  /**
   * Refresh Token
   */
  async refreshTokenAsUser(payload: JwtPayloadType): Promise<TokensType> {
    const tokens = await this.jwtService.signUserTokens({
      id: payload.id,
    });

    return tokens;
  }

  async refreshTokenAsAdmin(payload: JwtPayloadType): Promise<TokensType> {
    const tokens = await this.jwtService.signAdminTokens({
      id: payload.id,
    });

    return tokens;
  }
}
