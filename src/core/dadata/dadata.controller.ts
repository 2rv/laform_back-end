import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { DadataService } from './dadata.service';
import { DadataDto } from './dto/dadata.dto';

@Controller('dadata')
export class DadataController {
  constructor(private readonly dadataService: DadataService) {}

  @Get('/get/city-code/:kladr')
  async getCityCodeByKladr(@Param('kladr') kladr: string) {
    return this.dadataService.getCityCodeByKladr(kladr);
  }

  @Get('/get/postal-code/:value')
  async getPostalCode(@Param('value') value: string) {
    return this.dadataService.getPostalCode(value);
  }

  @Post('/get/country/:value')
  async getCountry(@Param('value') value: string) {
    return this.dadataService.getCountry(value);
  }

  @Post('/get/city')
  async getCity(@Body(new ValidationPipe()) body: DadataDto) {
    return this.dadataService.getCity(body);
  }

  @Post('/get/street')
  async getStreet(@Body(new ValidationPipe()) body: DadataDto) {
    return this.dadataService.getStreet(body);
  }

  @Post('/get/house')
  async getHouse(@Body(new ValidationPipe()) body: DadataDto) {
    return this.dadataService.getHouse(body);
  }
}
