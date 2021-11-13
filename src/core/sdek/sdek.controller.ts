import {
  Controller,
  Post,
  UseGuards,
  Get,
  Put,
  Body,
  Delete,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { request } from 'http';
import { SdekService } from './sdek.service';

@Controller('sdek')
export class SdekController {
  constructor(private readonly SdekService: SdekService) {}
  @Post('/auth')
  async authInSdek(@Request() req) {
    const { grant_type } = req.body;
    return this.SdekService.authInSdek(grant_type);
  }
  @Post('/calculator/tarrif/code')
  async CalculationByTariffCode(@Request() req) {
    return this.SdekService.CalculationByTariffCode(req);
  }
  @Post('/calculator/available/tarrif/code')
  async CalculationForAnAvailableTariffCode(@Request() req) {
    return this.SdekService.CalculationForAnAvailableTariffCode(req);
  }
}
