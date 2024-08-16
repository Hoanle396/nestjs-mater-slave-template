import { StellaConfig } from '@/config';
import { UserAuthConfig } from '@/config/user_auth.config';
import { User } from '@/databases/entities';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Causes } from 'src/common/exceptions/causes';
import { Repository } from 'typeorm';

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, 'user-jwt') {
  constructor(
    private readonly configService: ConfigService<StellaConfig>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        configService.get<UserAuthConfig>('userAuth').accessTokenSecret,
    });
  }

  async validate(payload: { id: string }) {
    const userExist = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: payload.id })
      .andWhere('user.isActive = :isActive', { isActive: true })
      .select([
        'user.id',
        'user.email',
        'user.fullName',
        'user.isActive',
        'user.createdAt',
      ])
      .getOne();

    if (!userExist)
      throw Causes.UNAUTHORIZED('Access Token', 'Invalid access token');

    return userExist;
  }
}
