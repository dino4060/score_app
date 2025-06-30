import { Module } from '@nestjs/common';
import { ScoresModule } from 'src/features/scores/scores.module';
import { PublicStatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';

@Module({
  imports: [ScoresModule],
  controllers: [PublicStatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule { }
