import { StellaConfig } from '@/config';
import { AdminAuthConfig } from '@/config/admin_auth.config';
import { Admin } from '@/databases/entities';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { JwtPayloadType } from 'src/shared/types';
import { Repository } from 'typeorm';

@Injectable()
export class AdminJwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'admin-jwt-refresh-token',
) {
  constructor(
    private readonly configService: ConfigService<StellaConfig>,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        configService.get<AdminAuthConfig>('adminAuth').refreshTokenSecret,
    });
  }

  async validate(payload: JwtPayloadType): Promise<JwtPayloadType> {
    if (!payload?.id) {
      throw new ForbiddenException();
    }

    const sessionExist = await this.adminRepository
      .createQueryBuilder('admin')
      .where('admin.id = :id', { id: payload.id })
      .getOne();
    if (!sessionExist) throw new ForbiddenException();

    return payload;
  }
}
