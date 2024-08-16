import type { ExecutionContext } from '@nestjs/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { RoleEnum } from 'src/shared/enums';
import { DataSource } from 'typeorm';

import { MyJwtService } from '../jwt.service';
import { ROLES_KEY } from '@/common/decorators/roles.decorator';
import { Admin } from '@/databases/entities/admin.entity';

@Injectable()
export class RoleGuard {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: MyJwtService,
    private readonly dataSource: DataSource,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride<RoleEnum[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
      throw new UnauthorizedException('Invalid token');
    }

    const token = authorizationHeader.replace('Bearer ', '');
    const id = await this.jwtService.decodeAccessTokenForAdmin(token);

    if (!id) {
      throw new UnauthorizedException('Invalid token');
    }

    const sessionExist = await this.dataSource
      .createQueryBuilder(Admin, 'admin')
      .where('adminSession.id = :id', { id })
      .andWhere('admin.isActive = :isActive', { isActive: true })
      .select(['admin.role'])
      .getOne();

    if (!sessionExist) {
      throw new UnauthorizedException('Token expired');
    }

    return roles.includes(sessionExist.role);
  }
}
