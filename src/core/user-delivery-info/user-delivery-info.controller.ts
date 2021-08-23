import {
  Body,
  Controller,
  Get,
  Patch,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetAccount } from '../user/decorator/get-account.decorator';
import { AccountGuard } from '../user/guard/account.guard';
import { UserEntity } from '../user/user.entity';

import { UserDeliveryInfoDto } from './dto/user-delivery-info.dto';
import { UserDeliveryInfoUpdateDto } from './dto/user-delivery-info-update.dto';
import { UserDeliveryInfoService } from './user-delivery-info.service';

@Controller('user/delivery/info')
export class UserDeliveryInfoController {
  constructor(private userDeliveryInfoService: UserDeliveryInfoService) {}

  @Get()
  @UseGuards(AuthGuard(), AccountGuard)
  async getUserDeliveryInfo(
    @GetAccount() user: UserEntity,
  ): Promise<UserDeliveryInfoDto> {
    return this.userDeliveryInfoService.getDeliveryInfo(user);
  }

  @Patch()
  @UseGuards(AuthGuard(), AccountGuard)
  async updateUserDeliveryInfo(
    @GetAccount() user: UserEntity,
    @Body(ValidationPipe) data: UserDeliveryInfoUpdateDto,
  ): Promise<void> {
    this.userDeliveryInfoService.updateDeliveryInfo(user, data);
  }
}
