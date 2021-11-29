import { SdekService } from './sdek.service';
import { SdekDto, SdekDtoOrder } from './dto/sdek.dto';
import { SdekUpdate } from './dto/sdekUpdate.dto';
import {
  Controller,
  Post,
  Get,
  UseGuards,
  Body,
  Delete,
  ValidationPipe,
  Query,
  Patch,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';

@Controller('sdek')
export class SdekController {
  constructor(private readonly sdekService: SdekService) {}

  @Get('/auth')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async authInSdek() {
    return this.sdekService.authInSdek();
  }

  @Get('/cities/:fiasGuid')
  @Roles(USER_ROLE.ADMIN, USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getCities(@Param('fiasGuid') fiasGuid: string) {
    return this.sdekService.getCities(fiasGuid);
  }

  @Get('/offices/:city_code')
  @Roles(USER_ROLE.ADMIN, USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getOffices(@Param('city_code') city_code: string) {
    return this.sdekService.getOffices(city_code);
  }

  @Get('/city-code/:kladr')
  @Roles(USER_ROLE.ADMIN, USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getCityCodeByKladr(@Param('kladr') kladr: string) {
    return this.sdekService.getCityCodeByKladr(kladr);
  }

  @Post('/calculator/tariff')
  @Roles(USER_ROLE.ADMIN, USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async сalculationByTariffCode(@Body(new ValidationPipe()) body: SdekDto) {
    return this.sdekService.сalculationByTariffCode(body);
  }

  @Post('/calculator/tarifflist')
  @Roles(USER_ROLE.ADMIN, USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getTariffList(@Body(new ValidationPipe()) body: SdekDto) {
    return this.sdekService.getTariffList(body);
  }

  @Post('/order/create')
  @Roles(USER_ROLE.ADMIN, USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async createOrder(@Body(new ValidationPipe()) body: SdekDtoOrder) {
    return this.sdekService.createOrder(body);
  }

  @Get('/order/:orderId')
  @Roles(USER_ROLE.ADMIN, USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getOrder(@Param('orderId') orderId: string) {
    return this.sdekService.getOrder(orderId);
  }

  @Patch('/order/edit')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async editOrder(@Body(new ValidationPipe()) body: SdekUpdate) {
    return this.sdekService.editOrder(body);
  }

  @Delete('/order/delete/:orderId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async deleteOrder(@Param('orderId') orderId: string) {
    return this.sdekService.deleteOrder(orderId);
  }
}
