import { GetUser } from './../user/decorator/get-account.decorator';
import { PurchaseGuard } from './guard/purchase.guard';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PurchaseService } from './purchase.service';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
  Get,
  Put,
  Query,
  Request,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { Roles } from '../user/decorator/role.decorator';
import { UserEntity } from '../user/user.entity';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post('/create')
  @Roles(USER_ROLE.USER, USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async saveForUser(
    @GetUser() user: UserEntity,
    @Body(new ValidationPipe()) body: CreatePurchaseDto,
  ) {
    body.purchase.userId = user.id;
    return await this.purchaseService.save(body, user.id, user.email);
  }

  @Post('/not-auth/create')
  async saveForNotAuthUser(
    @Body(new ValidationPipe()) body: CreatePurchaseDto,
  ) {
    return await this.purchaseService.save(
      body,
      undefined,
      body.purchase.email,
    );
  }

  @Get('get/:purchaseId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, PurchaseGuard)
  async getOne(@Request() req) {
    return await this.purchaseService.getOne(req.purchaseId);
  }

  @Get('/user/get/:purchaseId')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard, PurchaseGuard)
  async getOneForUser(@GetUser() user: UserEntity, @Request() req) {
    return await this.purchaseService.getOneForUser(req.purchaseId, user.id);
  }

  @Get('/get/')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getAll(@Query('size') size: number, @Query('page') page: number) {
    return await this.purchaseService.getAll(size, page);
  }

  @Get('/user/get/')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getAllForUsers(
    @GetUser() user: UserEntity,
    @Query('size') size: number,
    @Query('page') page: number,
  ) {
    return await this.purchaseService.getAllForUser(size, page, user.id);
  }

  @Put('update/:purchaseId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, PurchaseGuard)
  async update(@Body() body: any, @Request() req) {
    return await this.purchaseService.update(req.purchaseId, body);
  }

  @Delete('delete/:purchaseId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, PurchaseGuard)
  async delete(@Request() req) {
    return await this.purchaseService.delete(req.purchaseId);
  }
}
