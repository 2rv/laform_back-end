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
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { Roles } from '../user/decorator/role.decorator';
import { UserEntity } from '../user/user.entity';
import { UpdatePurchaseStatusDto } from './dto/update-purchase-status.dto';

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
    const verified = await this.purchaseService.verifyUserByCodeAndEmail(
      body.purchase,
    );

    if (verified) {
      return await this.purchaseService.save(
        body,
        undefined,
        body.purchase.email,
      );
    } else {
      return verified;
    }
  }

  @Get('get/:purchaseId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, PurchaseGuard)
  async getOne(@Request() req) {
    return await this.purchaseService.getOne(req.purchaseId);
  }

  @Get('/user/get/:purchaseId')
  @Roles(USER_ROLE.USER, USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getOneForUser(
    @GetUser() user: UserEntity,
    @Param('purchaseId') purchaseId: string,
  ) {
    return await this.purchaseService.getOneForUser(purchaseId, user.id);
  }

  @Get('/user/get/master-class/:purchaseId')
  async getOneMasterClass(@Param('purchaseId') purchaseId: string) {
    return await this.purchaseService.getOneMasterClass(purchaseId);
  }

  @Get('/get/')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getAll(@Query('size') size: number, @Query('page') page: number) {
    return await this.purchaseService.getAll(size, page);
  }

  @Get('/user/get/')
  @Roles(USER_ROLE.USER, USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getAllForUser(
    @GetUser() user: UserEntity,
    @Query('size') size: number,
    @Query('page') page: number,
  ) {
    return await this.purchaseService.getAllForUser(size, page, user.id);
  }

  @Put('update-status/:purchaseId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, PurchaseGuard)
  async updatePurchaseStatus(
    @Body() body: UpdatePurchaseStatusDto,
    @Request() req,
  ) {
    return await this.purchaseService.updatePurchaseStatus(
      req.purchaseId,
      body,
    );
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
