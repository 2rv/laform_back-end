import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { PromoCodeEntity } from './promo-code.entity';
import { PromoCodeService } from './promo-code.service';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';

import { CreatePromoCodeDto } from './dto/create-promo-code.dto';
import { CheckPromoCodeDto } from './dto/check-promo-code.dto';

@Controller('promo-code')
export class PromoCodeController {
  constructor(private readonly promoCodeService: PromoCodeService) {}

  @Post('/create')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async create(
    @Body(ValidationPipe) createPromoCodeDto: CreatePromoCodeDto,
  ): Promise<void> {
    return await this.promoCodeService.create(createPromoCodeDto);
  }

  @Get('/get')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getAll(): Promise<PromoCodeEntity[]> {
    return await this.promoCodeService.get();
  }

  @Get('/check/:code')
  async check(@Param('code') code: string) {
    return await this.promoCodeService.check(code);
  }

  @Delete('/delete')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async delete(@Body(ValidationPipe) body: { id: string }): Promise<void> {
    return await this.promoCodeService.delete(body);
  }
}
