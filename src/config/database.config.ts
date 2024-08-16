import { registerAs } from '@nestjs/config';
import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

export class DatabaseConfig {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  replication: {
    master: UserDatabaseConfig;
    slaves: UserDatabaseConfig[];
  };

  @IsNotEmpty()
  @IsBoolean()
  synchronize: boolean;

  @IsNotEmpty()
  @IsBoolean()
  logging: boolean;

  constructor() {
    this.type = process.env.DB_TYPE;
    this.replication = {
      master: {
        host: process.env.DB_HOST_MASTER,
        port: Number.parseInt(process.env.DB_PORT_MASTER ?? '', 10),
        username: process.env.DB_USERNAME_MASTER,
        password: process.env.DB_PASSWORD_MASTER,
        database: process.env.DB_DATABASE_MASTER,
      },
      slaves: [],
    };
    for (let i = 1; ; i++) {
      if (process.env[`DB_HOST_SLAVE_${i}`]) {
        this.replication.slaves.push({
          host: process.env[`DB_HOST_SLAVE_${i}`],
          port: Number.parseInt(process.env[`DB_PORT_SLAVE_${i}`] ?? '', 10),
          username: process.env[`DB_USERNAME_SLAVE_${i}`],
          password: process.env[`DB_PASSWORD_SLAVE_${i}`],
          database: process.env[`DB_DATABASE_SLAVE_${i}`],
        });
      } else {
        break;
      }
    }
    this.synchronize = process.env.DB_SYNCHRONIZE === 'true';
    this.logging = process.env.DB_LOGGING === 'true';
  }
}

export class UserDatabaseConfig {
  @IsNotEmpty()
  @IsString()
  host: string;

  @IsNotEmpty()
  @IsNumber()
  port: number;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  database: string;
}

export default registerAs<DatabaseConfig>(
  'database',
  () => new DatabaseConfig(),
);
