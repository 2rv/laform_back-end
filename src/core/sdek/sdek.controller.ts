import { SdekService } from './sdek.service';
import {
  Controller,
  Post,
  UseGuards,
  Get,
  Put,
  Body,
  Delete,
  Request,
} from '@nestjs/common';

@Controller('sdek')
export class SdekController {
  constructor(private readonly SdekService: SdekService) {}
  @Post('/auth') // если ничего не отправляем можно и get запрос
  async authInSdek() {
    return this.SdekService.authInSdek();
  }
  @Post('/calculator/tarrif/code') // сделать DTO почекай другие модули
  async CalculationByTariffCode(@Request() req) {
    return this.SdekService.CalculationByTariffCode(req);
  }
  @Post('/calculator/available/tarrif/code') // сделать DTO почекай другие модули
  async CalculationForAnAvailableTariffCode(@Request() req) {
    return this.SdekService.CalculationForAnAvailableTariffCode(req);
  }
  @Post('/registration/order') // сделать DTO почекай другие модули
  async registrationOrder(@Request() req) {
    return this.SdekService.registrationOrder(req);
  }
  @Get('/get/information/order') // брать id заказа здесь почекай другие модули
  async getInformationAboutOrder(@Request() req) {
    return this.SdekService.getInformationAboutOrder(req);
  }
}
