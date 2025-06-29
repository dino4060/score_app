import { Injectable } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Score } from './entities/score.entity';
import { Between, Repository } from 'typeorm';
import { Group, Level, ScoreByGroup, Subject } from 'src/statistics/response/statistics.response';

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

  public async topGroup(group: Group) {
    const { subjects, language2_type } = group;

    const totalExpress = subjects.map(s => `score.${s}`).join(' + ');

    const query = this.scoreRepo
      .createQueryBuilder('score')
      .select([
        'score.registrationNumber',
        ...subjects.map(s => `score.${s}`),
        `${totalExpress} AS total`,
      ])
      .where(`${subjects.map(s => `score.${s} IS NOT NULL`).join(' AND ')}`)
      .orderBy('total', 'DESC')
      .limit(10);

    if (language2_type) {
      query.andWhere('score.language2_type = :lang', { lang: language2_type });
    }

    const result = await query.getRawMany();

    const normalizedResult = result.map(item => ({
      ...item,
      total: Math.round(item.total * 100) / 100,
    }));

    return normalizedResult as ScoreByGroup[];

  }
}
