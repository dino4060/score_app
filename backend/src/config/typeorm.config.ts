// src/config/typeorm.config.ts
import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (env: ConfigService) => {
    const logger = new Logger('TypeOrmConfig');

    const options: TypeOrmModuleOptions = {
      type: process.env.TYPE_ORM_SERVER as 'postgres' || 'postgres',
      host: process.env.TYPE_ORM_HOST || 'localhost',
      port: env.get<number>('TYPE_ORM_PORT') || 5433,
      username: process.env.TYPE_ORM_USERNAME || 'postgres',
      password: process.env.TYPE_ORM_PASSWORD || '123456',
      database: process.env.TYPE_ORM_DATABASE || 'gscore',
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: env.get<boolean>('TYPE_ORM_SYNCHRONIZE') || true,
      ssl: {
        rejectUnauthorized: false,
      },
    }

    logger.log(`>>> TypeOrmConfig is connecting to server {${options.type}, ${options.host}, ${options.port}, ${options.database}}`);

    return options;
  },
};