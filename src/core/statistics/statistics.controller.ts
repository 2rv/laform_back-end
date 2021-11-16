import {
  Controller,
  Post,
  UseGuards,
  Get,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

import { StatisticsService } from './statistics.service';
import { StatisticType } from './enum/statistic.enum';
import { StatisticValidationPipe } from './pipe/statistic-type.pipe';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { Roles } from '../user/decorator/role.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';

@Controller('statistics')
export class StatisticsController {
  constructor(private statisticsService: StatisticsService) {}

  @Get('price/get')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async price(
    @Query('from') from: Date,
    @Query('to') to: Date,
    @Query(new StatisticValidationPipe()) type: StatisticType,
  ) {
    return await this.statisticsService.priceStatistic(from, to, type);
  }

  @Get('count/get')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async count(
    @Query('from') from: Date,
    @Query('to') to: Date,
    @Query(new StatisticValidationPipe()) type: StatisticType,
  ) {
    return await this.statisticsService.countStatistic(from, to, type);
  }
}
