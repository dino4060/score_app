import { Controller, Get, Query } from '@nestjs/common';
import { Subject } from './types/statistics.types';
import { subjects as allSubjects, groups } from './utils/statistics.utils';
import { StatisticsService } from './statistics.service';

@Controller('public/reports')
export class PublicStatisticsController {
  constructor(private readonly statisticsService: StatisticsService) { }

  @Get('subjects')
  async reportSubjects(@Query('subjects') subjects: string[]) {
    let subjectsToQuery: Subject[];

    if (!subjects || subjects.length === 0) {
      subjectsToQuery = allSubjects;
    } else {
      subjectsToQuery = allSubjects.filter((subject) => subjects.includes(subject));
    }

    return this.statisticsService.reportBySubjects(subjectsToQuery);
  }

  @Get('tops/group')
  async topGroup(@Query('group') group: string) {
    const groupToQuery = groups.find(g => g.name === group) ?? groups[0];
    //return groupToQuery;
    return this.statisticsService.topGroup(groupToQuery);
  }
}
