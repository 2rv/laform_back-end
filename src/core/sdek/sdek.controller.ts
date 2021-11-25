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

  @Get('/auth')
  @Roles(USER_ROLE.ADMIN, USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async authInSdek() {
    return this.SdekService.authInSdek();
  }

  @Post('/calculator/tarrif/code')
  @Roles(USER_ROLE.ADMIN, USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async CalculationByTariffCode(@Body(new ValidationPipe()) body: SdekDto) {
    return this.SdekService.CalculationByTariffCode(body);
  }

  @Post('/calculator/available/tarrif/code')
  @Roles(USER_ROLE.ADMIN, USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getTariff(@Body(new ValidationPipe()) body: SdekDto) {
    return this.SdekService.getTariff(body);
  }

  @Post('/registration/order')
  @Roles(USER_ROLE.ADMIN, USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async registrationOrder(@Body(new ValidationPipe()) body: SdekDtoOrder) {
    return this.SdekService.registrationOrder(body);
  }

  @Get('/get/information/order')
  @Roles(USER_ROLE.ADMIN, USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getInformationAboutOrder(@Query() query) {
    return this.SdekService.getInformationAboutOrder(query.id);
  }

  @Patch('/edit/order')
  @Roles(USER_ROLE.ADMIN, USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async editOrder(@Body(new ValidationPipe()) body: SdekUpdate) {
    return this.SdekService.editOrder(body);
  }

  @Get('/get/office')
  @Roles(USER_ROLE.ADMIN, USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getOffice(@Query() query) {
    return this.SdekService.getOffice(query.postal_code);
  }

  @Delete('/delete/order')
  @Roles(USER_ROLE.ADMIN, USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async deleteOrder(@Query() query) {
    return this.SdekService.deleteOrder(query.id);
  }

  @Get('/get/cities')
  @Roles(USER_ROLE.ADMIN, USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async listOfCities(@Query() query) {
    return this.SdekService.listOfCities(query.fias_guid);
  }
}
