import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { Base } from './base/time.entity';
import { User } from './user.entity';

@Entity()
export class OTPCode extends Base {
  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column({ length: 6, nullable: true })
  code: string;

  @Column({ type: 'timestamp' })
  expiresAt: Date;
}
