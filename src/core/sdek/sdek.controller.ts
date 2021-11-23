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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';

@Controller('sdek')
export class SdekController {
  constructor(private readonly SdekService: SdekService) {}

  // @Roles(USER_ROLE.ADMIN, USER_ROLE.USER)
  // @UseGuards(AuthGuard('jwt'), AccountGuard)
  @Get('/auth')
  async authInSdek() {
    return this.SdekService.authInSdek();
  }
  @Roles(USER_ROLE.ADMIN, USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  @Post('/calculator/tarrif/code')
  async CalculationByTariffCode(@Body(new ValidationPipe()) body: SdekDto) {
    return this.SdekService.CalculationByTariffCode(body);
  }
  @Roles(USER_ROLE.ADMIN, USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  @Post('/calculator/available/tarrif/code')
  async getTariff(@Body(new ValidationPipe()) body: SdekDto) {
    return this.SdekService.getTariff(body);
  }
  @Roles(USER_ROLE.ADMIN, USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  @Post('/registration/order')
  async registrationOrder(@Body(new ValidationPipe()) body: SdekDtoOrder) {
    return this.SdekService.registrationOrder(body);
  }
  @Roles(USER_ROLE.ADMIN, USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  @Get('/get/information/order')
  async getInformationAboutOrder(@Query() query) {
    return this.SdekService.getInformationAboutOrder(query.id);
  }
  @Roles(USER_ROLE.ADMIN, USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  @Patch('/edit/order')
  async editOrder(@Body(new ValidationPipe()) body: SdekUpdate) {
    return this.SdekService.editOrder(body);
  }
  // @Roles(USER_ROLE.ADMIN, USER_ROLE.USER)
  // @UseGuards(AuthGuard('jwt'), AccountGuard)
  @Get('/get/office')
  async getOffice(@Query() query) {
    return this.SdekService.getOffice(query.postal_code);
  }
  // @Roles(USER_ROLE.ADMIN, USER_ROLE.USER)
  // @UseGuards(AuthGuard('jwt'), AccountGuard)
  @Delete('/delete/order')
  async deleteOrder(@Query() query) {
    return this.SdekService.deleteOrder(query.id);
  }
  // @Roles(USER_ROLE.ADMIN, USER_ROLE.USER)
  // @UseGuards(AuthGuard('jwt'), AccountGuard)
  @Get('/get/cities')
  async listOfCities(@Query() query) {
    return this.SdekService.listOfCities(query.fias_guid);
  }
}
