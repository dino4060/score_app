// src/config/typeorm.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'root',
  password: '123456',
  database: 'scores',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};