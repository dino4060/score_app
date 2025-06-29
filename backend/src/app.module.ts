import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ScoresModule } from './features/scores/scores.module';
import { StatisticsModule } from './features/statistics/statistics.module';
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
