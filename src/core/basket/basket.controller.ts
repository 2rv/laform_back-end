import { GetAccount, GetUser } from '../user/decorator/get-account.decorator';
import { BasketGuard } from './guard/basket.guard';
import { BasketService } from './basket.service';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
  Get,
  Request,
  Delete,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { Roles } from '../user/decorator/role.decorator';
import { UserEntity } from '../user/user.entity';
import { PurchaseProductGuard } from '../purchase-product/guard/purchase-product.guard';
import { PurchaseProductDto } from '../purchase/dto/purchase-product.dto';

@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Post('/create')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async saveForUser(
    @GetUser() user: UserEntity,
    @Body(new ValidationPipe()) body: PurchaseProductDto,
  ) {
    return await this.basketService.createProduct(user.id, body);
  }

  @Get('/get')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async find(@GetUser() user: UserEntity) {
    return await this.basketService.findOne(user.id);
  }

  @Patch('update/product/:purchaseProductId')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard, PurchaseProductGuard, BasketGuard)
  async update(
    @GetUser() user: UserEntity,
    @Body() body: PurchaseProductDto,
    @Request() req,
  ) {
    return await this.basketService.updateProduct(
      req.purchaseProductId,
      body,
      user.id,
    );
  }

  @Delete('delete/product/:purchaseProductId')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard, PurchaseProductGuard, BasketGuard)
  async delete(@GetUser() user: UserEntity, @Request() req) {
    return await this.basketService.deleteProduct(
      req.purchaseProductId,
      user.id,
    );
  }
}
