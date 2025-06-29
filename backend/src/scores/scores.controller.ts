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

  @Post()
  create(@Body() createScoreDto: CreateScoreDto) {
    return this.scoresService.create(createScoreDto);
  }

  @Get()
  findAll() {
    return this.scoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scoresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScoreDto: UpdateScoreDto) {
    return this.scoresService.update(+id, updateScoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scoresService.remove(+id);
  }
}
