import { StellaConfig } from '@/config';
import { AdminAuthConfig } from '@/config/admin_auth.config';
import { Admin } from '@/databases/entities';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Causes } from 'src/common/exceptions/causes';
import { Repository } from 'typeorm';

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
  constructor(
    private readonly configService: ConfigService<StellaConfig>,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        configService.get<AdminAuthConfig>('adminAuth').accessTokenSecret,
    });
  }

  async validate(payload: { id: string }) {
    const admin = await this.adminRepository
      .createQueryBuilder('admin')
      .where('admin.id = :id', { id: payload.id })
      .andWhere('admin.isActive = :isActive', { isActive: true })
      .select([
        'admin.id',
        'admin.email',
        'admin.fullName',
        'admin.role',
        'admin.isActive',
        'admin.createdAt',
      ])
      .getOne();

    if (!admin)
      throw Causes.UNAUTHORIZED('Access Token', 'Invalid access token');

    return admin;
  }
}
