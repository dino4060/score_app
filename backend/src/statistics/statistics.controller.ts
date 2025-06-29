import { Controller, Get, Query } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { Subject } from './response/statistics.response';
import { subjects as allSubjects } from './utils/statistics.utils';

@Controller('report')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) { }


  @Get('subjects')
  async reportSubjects(@Query('subjects') subjects: string[]) {
    let subjectsToQuery: Subject[];

    if (!subjects || subjects.length === 0) {
      subjectsToQuery = allSubjects;
    } else {
      subjectsToQuery = allSubjects.filter((subject) => subjects.includes(subject));
    }

    //return "oke" + " " + subjects + " " + subjectsToQuery;

    return this.statisticsService.reportBySubjects(subjectsToQuery);
  }
}
