import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group, Level, Subject } from 'src/features/statistics/types/statistics.types';
import { Between, Repository } from 'typeorm';
import { Score } from './entities/score.entity';
import { GroupScore, ScoreByGroup } from './types/score.types';
import { groups } from '../statistics/utils/statistics.utils';

@Injectable()
export class ScoresService {

  constructor(
    @InjectRepository(Score)
    private readonly scoreRepo: Repository<Score>,
  ) { }

  public async calculateGroupScores(score: Score) {
    const result: GroupScore = {
      A00: null,
      A01: null,
      A02: null,
      B00: null,
      C00: null,
      D00: null,
    };

    for (const group of groups) {
      // check language2_type
      if (group.language2_type && score.language2Type !== group.language2_type) {
        result[group.name] = null;
        continue;
      }

      const subjectScores = group.subjects.map((subject) => score[subject]);

      if (subjectScores.some((val) => val == null)) {
        result[group.name] = null;
        continue;
      }

      const total = (subjectScores as number[]).reduce((sum, val) => sum + val, 0);
      result[group.name] = total;
    }

    return result;
  }


  public async searchScore(registration: number) {
    const studentScore = await this.scoreRepo.findOneBy({ registrationNumber: registration });

    if (!studentScore) return null;

    const groupScore = await this.calculateGroupScores(studentScore);

    return {
      studentScore,
      groupScore,
    };
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
