import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './infrastructure/config/typeorm.config';
import { ScoresModule } from './scores/scores.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ScoresModule,
    StatisticsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
