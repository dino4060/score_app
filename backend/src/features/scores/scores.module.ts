import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from './entities/score.entity';
import { PublicScoresController } from './scores.controller';
import { ScoresService } from './scores.service';

@Module({
  imports: [TypeOrmModule.forFeature([Score])],
  controllers: [PublicScoresController],
  providers: [ScoresService],
  exports: [ScoresService],
})
export class ScoresModule { }
