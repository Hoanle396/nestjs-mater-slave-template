import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEnum } from 'src/shared/enums';
import { Repository } from 'typeorm';

import { HashService } from '@/modules/auth/hash.service';
import { Admin } from '../../entities';

@Injectable()
export class AdminSeedService {
  logger = new Logger(AdminSeedService.name);

  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async bootstrap(): Promise<void> {
    await this.truncateTables();
    await this.seedAdmin();

    this.logger.debug(
      'The data seeding process for Admin has been completed successfully!',
    );
  }

  private async truncateTables(): Promise<void> {
    await this.adminRepository.query(`DELETE FROM admin WHERE id > 0;`);
    await this.adminRepository.query(`ALTER TABLE admin AUTO_INCREMENT = 1;`);
  }

  private async seedAdmin(): Promise<void> {
    const admins = [
      {
        id: 1,
        email: 'hoanle396@gmail.com',
        fullName: 'Le Huu Hoan',
        password: new HashService().hash('123456'),
        role: RoleEnum.SUPER_ADMIN,
        isActive: true,
      },
    ];

    const values = admins
      .map(
        admin =>
          `(${admin.id}, '${admin.email}', '${admin.fullName}', '${admin.password}', '${admin.role}', ${admin.isActive})`,
      )
      .join(', ');

    await this.adminRepository.query(
      `INSERT INTO admin (id, email, fullName, password, role, isActive) VALUES ${values};`,
    );
  }
}
