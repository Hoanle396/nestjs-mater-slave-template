import { Cat } from '@/cat/entities/cat.entity';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { DataSourceOptions } from 'typeorm';
import { MysqlConnectionCredentialsOptions } from 'typeorm/driver/mysql/MysqlConnectionCredentialsOptions';

export interface EnvConfig {
  [key: string]: string;
}

@Injectable()
export class AppConfigService {
  public readonly envConfig: EnvConfig;

  constructor(public filePath: string) {
    let file: Buffer | undefined;
    try {
      file = fs.readFileSync(filePath);
    } catch (error) {
      file = fs.readFileSync('.env');
    }

    this.envConfig = dotenv.parse(file);
  }

  getDataSourceOptions(): DataSourceOptions {
    const type = 'mysql';
    const logging = this.envConfig.DB_LOGGING === 'true';
    const synchronize = this.envConfig.DB_SYNCHRONIZE === 'true';
    const entities = [Cat];

    const master = {
      host: this.envConfig.DB_HOST_MASTER,
      port: Number.parseInt(this.envConfig.DB_PORT_MASTER ?? '', 10),
      username: this.envConfig.DB_USERNAME_MASTER,
      password: this.envConfig.DB_PASSWORD_MASTER,
      database: this.envConfig.DB_DATABASE_MASTER,
    };

    const slaves: MysqlConnectionCredentialsOptions[] = [];

    for (let i = 1; ; i++) {
      if (this.envConfig[`DB_HOST_SLAVE_${i}`]) {
        slaves.push({
          host: this.envConfig[`DB_HOST_SLAVE_${i}`],
          port: Number.parseInt(this.envConfig[`DB_PORT_SLAVE_${i}`] ?? '', 10),
          username: this.envConfig[`DB_USERNAME_SLAVE_${i}`],
          password: this.envConfig[`DB_PASSWORD_SLAVE_${i}`],
          database: this.envConfig[`DB_DATABASE_SLAVE_${i}`],
        });
      } else {
        break;
      }
    }
    return {
      type,
      replication: {
        master,
        slaves,
      },
      logging,
      synchronize,
      entities,
    };
  }
}
