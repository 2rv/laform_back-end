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
// import { SdekGuard } from './guard/sdek.guard';

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

  // @Put('update/:id')
  // @Roles(USER_ROLE.USER)
  // @UseGuards(AuthGuard('jwt'), AccountGuard, SdekGuard)
  // @UseInterceptors(FileInterceptor('file'))
  // async update(@Request() req, @UploadedFile() file) {
  //   return await this.SdekService.update(req.fileId, file);
  // }

  // @Get('get/:fileId')
  // @Roles(USER_ROLE.USER)
  // @UseGuards(AuthGuard('jwt'), AccountGuard, SdekGuard)
  // async getOne(@Request() req) {
  //   return await this.SdekService.getOne(req.fileId);
  // }

  // @Get('get/')
  // @Roles(USER_ROLE.USER)
  // @UseGuards(AuthGuard('jwt'), AccountGuard)
  // async getAll(@GetUser() user: UserEntity) {
  //   return await this.fileUploadService.getAll();
  // }

  //   @Delete('delete/:id')
  //   @Roles(USER_ROLE.USER)
  //   @UseGuards(AuthGuard('jwt'), AccountGuard, SdekGuard)
  //   async delete(@Request() req) {
  //     return await this.SdekService.delete(req.fileId);
  //   }
}
