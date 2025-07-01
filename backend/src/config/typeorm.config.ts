// src/config/typeorm.config.ts
import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { log } from 'console';

type TOrmTypeServer = 'postgres' | 'mysql' | 'mssql';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (env: ConfigService) => {
    const logger = new Logger('TypeOrmConfig');

    const options: TypeOrmModuleOptions = {
      type: process.env.TYPE_ORM_SERVER as 'postgres',
      host: process.env.TYPE_ORM_HOST,
      port: env.get<number>('TYPE_ORM_PORT'),
      username: process.env.TYPE_ORM_USERNAME,
      password: process.env.TYPE_ORM_PASSWORD,
      database: process.env.TYPE_ORM_DATABASE,
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: env.get<boolean>('TYPE_ORM_SYNCHRONIZE'),
    }

    logger.log(`>>> TypeOrmConfig is connecting to server {${options.type}, ${options.host}, ${options.port}, ${options.database}}`);

    return options;
  },
};