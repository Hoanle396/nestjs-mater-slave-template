import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminJwtRefreshTokenGuard extends AuthGuard(
  'admin-jwt-refresh-token',
) {
  constructor() {
    super();
  }
}
