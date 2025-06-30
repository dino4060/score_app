import { Controller, Get, Param } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { occurError } from 'src/utils/index.utils';

@Controller('public/scores')
export class PublicScoresController {
  constructor(private readonly scoresService: ScoresService) { }

  @Get('search/:registration')
  searchScore(@Param('registration') registration: string) {
    const registrationNumber = Number(registration)

    if (isNaN(registrationNumber))
      return occurError('Registration number must be a number.');

    return this.scoresService.searchScore(registrationNumber);
  }
}
