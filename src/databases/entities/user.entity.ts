import { Column, Entity } from 'typeorm';
import { Base } from './base/time.entity';

@Entity()
export class User extends Base {
  @Column({ unique: true, length: 100, nullable: false })
  email: string;

  @Column({ length: 100, nullable: false })
  fullName: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
