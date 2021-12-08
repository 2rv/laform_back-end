import { SdekService } from './sdek.service';
import { SdekDto } from './dto/sdek.dto';
import { SdekUpdateDto } from './dto/sdekUpdate.dto';
import { SdekCalculateDto } from './dto/sdekCalculate.dto';
import { SdekOrderDto } from './dto/sdekOrder.dto';

import {
  Controller,
  Post,
  Get,
  UseGuards,
  Body,
  Delete,
  ValidationPipe,
  Patch,
  Param,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { SdekPdfDto } from './dto/sdekPdf.dto';
import { SdekCourierDto } from './dto/sdek.courier.dto';
import { SdekBarcoderDto } from './dto/sdek.barcode.dto';
import { Readable } from 'stream';

@Controller('sdek')
export class SdekController {
  constructor(private readonly sdekService: SdekService) {}

  @Get('/auth')
  // @Roles(USER_ROLE.ADMIN)
  // @UseGuards(AuthGuard('jwt'), AccountGuard)
  async authInSdek() {
    return this.sdekService.authInSdek();
  }

  @Get('/city-code/:kladr')
  // @Roles(USER_ROLE.ADMIN, USER_ROLE.USER)
  // @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getCityCodeByKladr(@Param('kladr') kladr: string) {
    return this.sdekService.getCityCodeByKladr(kladr);
  }

  @Post('/calculator/tariff')
  // @Roles(USER_ROLE.ADMIN, USER_ROLE.USER)
  // @UseGuards(AuthGuard('jwt'), AccountGuard)
  async сalculationByTariffCode(
    @Body(new ValidationPipe()) body: SdekCalculateDto,
  ) {
    return this.sdekService.сalculationByTariffCode(body);
  }

  @Post('/calculator/tarifflist')
  // @Roles(USER_ROLE.ADMIN, USER_ROLE.USER)
  // @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getTariffList(@Body(new ValidationPipe()) body: SdekDto) {
    return this.sdekService.getTariffList(body);
  }

  @Post('/order/create')
  // @Roles(USER_ROLE.ADMIN, USER_ROLE.USER)
  // @UseGuards(AuthGuard('jwt'), AccountGuard)
  async createOrder(@Body(new ValidationPipe()) body) {
    return this.sdekService.createOrder(body);
  }

  @Post('/order/create/pdf')
  // @Roles(USER_ROLE.ADMIN, USER_ROLE.USER)
  // @UseGuards(AuthGuard('jwt'), AccountGuard)
  async createPdfReceipt(
    @Body(new ValidationPipe()) body: SdekPdfDto,
    @Res() res,
  ) {
    const stream = Readable.from(await this.sdekService.createPdfReceipt(body));
    stream.pipe(res);
  }

  @Post('/order/courier')
  // @Roles(USER_ROLE.ADMIN, USER_ROLE.USER)
  // @UseGuards(AuthGuard('jwt'), AccountGuard)
  async createCourier(@Body(new ValidationPipe()) body: SdekCourierDto) {
    return this.sdekService.createCourier(body);
  }

  @Post('/order/barcode')
  // @Roles(USER_ROLE.ADMIN, USER_ROLE.USER)
  // @UseGuards(AuthGuard('jwt'), AccountGuard)
  async createBarcode(
    @Body(new ValidationPipe()) body: SdekBarcoderDto,
    @Res() res,
  ) {
    const stream = await this.sdekService.createBarcode(body);
    res.end(stream);
  }

  @Get('/order/:orderId')
  // @Roles(USER_ROLE.ADMIN, USER_ROLE.USER)
  // @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getOrder(@Param('orderId') orderId: string) {
    return this.sdekService.getOrder(orderId);
  }

  @Patch('/order/edit')
  // @Roles(USER_ROLE.ADMIN)
  // @UseGuards(AuthGuard('jwt'), AccountGuard)
  async editOrder(@Body(new ValidationPipe()) body: SdekUpdateDto) {
    return this.sdekService.editOrder(body);
  }

  @Delete('/order/delete/:orderId')
  // @Roles(USER_ROLE.ADMIN)
  // @UseGuards(AuthGuard('jwt'), AccountGuard)
  async deleteOrder(@Param('orderId') orderId: string) {
    return this.sdekService.deleteOrder(orderId);
  }
}
