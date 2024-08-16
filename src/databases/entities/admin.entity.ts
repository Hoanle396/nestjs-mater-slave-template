import { RoleEnum } from 'src/shared/enums';
import { Column, Entity } from 'typeorm';

import { Base } from './base/time.entity';

@Entity()
export class Admin extends Base {
  @Column({ unique: true, length: 100, nullable: false })
  email: string;

  @Column({ length: 100, nullable: false })
  fullName: string;

  @Column({ length: 100, nullable: false })
  password: string;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.ADMIN,
    nullable: false,
  })
  role: RoleEnum;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
