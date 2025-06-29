import { Module } from '@nestjs/common';
import { ScoresModule } from 'src/scores/scores.module';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';

@Module({
  imports: [ScoresModule],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule { }
