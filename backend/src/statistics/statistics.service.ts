import { Injectable } from '@nestjs/common';
import { ScoresService } from 'src/scores/scores.service';
import { Group, Level, LevelCount, Subject, SubjectReport, TotalReport } from './types/statistics.types';
import { levels } from './utils/statistics.utils';

@Injectable()
export class StatisticsService {

    constructor(
        private readonly scoreService: ScoresService,
    ) { }

    // 👉 Count 1 level for 1 subject
    private async countByLevel(subject: Subject, level: Level) {
        return await this.scoreService.countByLevel(subject, level)
    }

    // 👉 Count all levels for 1 subject
    private async countByLevels(subject: Subject) {
        const counts: LevelCount[] = [];

        for (const level of levels) {
            const count = await this.countByLevel(subject, level);
            counts.push({ level: level.name, count });
        }

        return counts;
    }

    // 👉 Report for 1 subject
    private async reportBySubject(subject: Subject) {
        const counts = await this.countByLevels(subject);

        return { subject, counts } as SubjectReport;
    }


    // 👉 Report for many subjects
    public async reportBySubjects(subjects: Subject[]) {
        const reports: SubjectReport[] = [];

        for (const subject of subjects) {
            const report = await this.reportBySubject(subject);
            reports.push(report);
        }

        return { reports } as TotalReport;
    }

    // 👉 Top for 1 group
    async topGroup(group: Group) {
        return this.scoreService.topGroup(group);
    }

}
