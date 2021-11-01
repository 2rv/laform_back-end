import {
  Controller,
  Post,
  UseGuards,
  Get,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private statisticsService: StatisticsService) {}

  @Get('get')
  async get() {
    return await this.statisticsService.getInfo();
  }

  @Get('get/master-class')
  async getMasterClass() {
    return await this.statisticsService.getPurchasesMasterClassDataForPeriod();
  }
}
