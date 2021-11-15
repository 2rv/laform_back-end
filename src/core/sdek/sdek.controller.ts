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
import { SdekDto } from './dto/sdek.dto';

@Controller('sdek')
export class SdekController {
  constructor(private readonly SdekService: SdekService) {}
  @Post('/auth')
  async authInSdek() {
    return this.SdekService.authInSdek();
  }
  @Post('/calculator/tarrif/code')
  async CalculationByTariffCode(@Request() req) {
    return this.SdekService.CalculationByTariffCode(req);
  }
  @Post('/calculator/available/tarrif/code')
  async CalculationForAnAvailableTariffCode(@Request() req) {
    return this.SdekService.CalculationForAnAvailableTariffCode(req);
  }
  @Post('/registration/order')
  async registrationOrder(@Request() req) {
    return this.SdekService.registrationOrder(req);
  }
  @Get('/get/information/order')
  async getInformationAboutOrder(@Request() req) {
    return this.SdekService.getInformationAboutOrder(req);
  }
}
