import { StellaConfig } from '@/config';
import { UserAuthConfig } from '@/config/user_auth.config';
import { User } from '@/databases/entities';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { JwtPayloadType } from 'src/shared/types';
import { Repository } from 'typeorm';

@Injectable()
export class UserJwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'user-jwt-refresh-token',
) {
  constructor(
    private readonly configService: ConfigService<StellaConfig>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        configService.get<UserAuthConfig>('userAuth').refreshTokenSecret,
    });
  }

  async validate(payload: JwtPayloadType): Promise<JwtPayloadType> {
    if (!payload?.id) {
      throw new ForbiddenException();
    }

    const sessionExist = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: payload.id })
      .getOne();
    if (!sessionExist) throw new ForbiddenException();

    return payload;
  }
}
