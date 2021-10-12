import {
  Controller,
  Post,
  UseGuards,
  Get,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { DeliveryPriceService } from './delivery-price.service';

@Controller('delivery-price')
export class DeliveryPriceController {
  constructor(private deliveryPriceService: DeliveryPriceService) {}

  @Get('get')
  async get() {
    return await this.deliveryPriceService.get();
  }

  @Post('create')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async create(@Body() body) {
    return await this.deliveryPriceService.create(body);
  }

  @Delete('remove/:id')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async remove(@Param('id') id: string) {
    return await this.deliveryPriceService.remove(id);
  }
}
