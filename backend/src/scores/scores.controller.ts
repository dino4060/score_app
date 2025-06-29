import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { ScoresService } from './scores.service';

@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) { }

  @Get('search/:registration')
  searchScore(@Param('registration') registration: string) {
    const registrationNumber = Number(registration)

    if (isNaN(registrationNumber)) return null;

    return this.scoresService.searchScore(registrationNumber);
  }
}
