import { Injectable } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Score } from './entities/score.entity';
import { Between, Repository } from 'typeorm';
import { Level, Subject } from 'src/statistics/response/statistics.response';


@Injectable()
export class ScoresService {

  constructor(
    @InjectRepository(Score)
    private readonly scoreRepo: Repository<Score>,
  ) { }

  public async searchScore(registration: number) {
    return this.scoreRepo.findOneBy({ registrationNumber: registration });
  }

  public async countByLevel(subject: Subject, level: Level) {
    return await this.scoreRepo.count({
      where: {
        [subject]: Between(level.min, level.max),
      },
    });
  }

  create(createScoreDto: CreateScoreDto) {
    return 'This action adds a new score';
  }

  findAll() {
    return `This action returns all scores`;
  }

  findOne(id: number) {
    return `This action returns a #${id} score`;
  }

  update(id: number, updateScoreDto: UpdateScoreDto) {
    return `This action updates a #${id} score`;
  }

  remove(id: number) {
    return `This action removes a #${id} score`;
  }
}
