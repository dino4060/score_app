import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { ScoresService } from 'src/scores/scores.service';
import { ScoresModule } from 'src/scores/scores.module';

@Module({
  controllers: [StatisticsController],
  providers: [StatisticsService],
  imports: [ScoresModule],
})
export class StatisticsModule { }
