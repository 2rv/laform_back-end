import { SdekService } from './sdek.service';
import { SdekDto, SdekDtoOrder } from './dto/sdek.dto';
import { SdekUpdate } from './dto/sdekUpdate.dto';
import {
  Controller,
  Post,
  Get,
  Body,
  Delete,
  ValidationPipe,
  Query,
  Patch,
} from '@nestjs/common';

@Controller('sdek')
export class SdekController {
  constructor(private readonly SdekService: SdekService) {}
  @Get('/auth')
  async authInSdek() {
    return this.SdekService.authInSdek();
  }
  @Post('/calculator/tarrif/code')
  async CalculationByTariffCode(@Body(new ValidationPipe()) body: SdekDto) {
    return this.SdekService.CalculationByTariffCode(body);
  }
  @Post('/calculator/available/tarrif/code')
  async getTariff(@Body(new ValidationPipe()) body: SdekDto) {
    return this.SdekService.getTariff(body);
  }
  @Post('/registration/order')
  async registrationOrder(@Body(new ValidationPipe()) body: SdekDtoOrder) {
    return this.SdekService.registrationOrder(body);
  }
  @Get('/get/information/order')
  async getInformationAboutOrder(@Query() query) {
    return this.SdekService.getInformationAboutOrder(query.id);
  }
  @Patch('/edit/order')
  async editOrder(@Body(new ValidationPipe()) body: SdekUpdate) {
    return this.SdekService.editOrder(body);
  }
  @Delete('/delete/order')
  async deleteOrder(@Query() query) {
    return this.SdekService.deleteOrder(query.id);
  }
}
