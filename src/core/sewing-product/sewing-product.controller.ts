import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
  Get,
  Put,
  Query,
  Delete,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { SewingProductService } from './sewing-product.service';
import { SewingProductGuard } from './guard/sewing-product.guard';
import { LangValidationPipe } from 'src/common/guards/lang.guard';
import { SewingProductDto } from './dto/sewing-product.dto';
import { GetAccount } from '../user/decorator/get-account.decorator';
import { UserEntity } from '../user/user.entity';
import { PageNavigationGuard } from '../page-navigation/guard/page-navigationt.guard';

@Controller('sewing-product')
export class SewingProductController {
  constructor(private sewingProductService: SewingProductService) {}

  @Post('/create/')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async save(@Body(new ValidationPipe()) body: SewingProductDto) {
    return await this.sewingProductService.create(body);
  }

  @Get('/get/')
  async getAll(
    @Query(new LangValidationPipe()) query: string,
    @Query('size') size: number,
    @Query('sort') sort: string,
    @Query('page') page: number,
    @Query('by') by: 'DESC' | 'ASC',
    @Query('where') where: string,
    @Query('category') category: string,
    @Query('getAll') getAll: boolean,
  ) {
    return await this.sewingProductService.getAll(
      query,
      size,
      page,
      sort,
      by,
      where,
      category,
      getAll,
    );
  }
  @Get('/auth/get/')
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getAllAuth(
    @Query(new LangValidationPipe()) query: string,
    @Query('size') size: number,
    @Query('sort') sort: string,
    @Query('page') page: number,
    @Query('by') by: 'DESC' | 'ASC',
    @Query('where') where: string,
    @Query('category') category: string,
    @GetAccount() user: UserEntity,
  ) {
    return await this.sewingProductService.getAllAuth(
      query,
      size,
      page,
      sort,
      by,
      where,
      category,
      user.id,
    );
  }

  @Get('/get/:sewingProductId')
  @UseGuards(SewingProductGuard)
  @UseGuards(PageNavigationGuard)
  async getOne(
    @Query(new LangValidationPipe()) query,
    @Param('sewingProductId') sewingProductId: string,
  ) {
    return await this.sewingProductService.getOne(sewingProductId, query);
  }
  @Get('/auth/get/:sewingProductId')
  @UseGuards(AuthGuard('jwt'), AccountGuard, SewingProductGuard)
  @UseGuards(PageNavigationGuard)
  async getOneAuth(
    @Query(new LangValidationPipe()) query,
    @Param('sewingProductId') sewingProductId: string,
    @GetAccount() user: UserEntity,
  ) {
    return await this.sewingProductService.getOneAuth(
      sewingProductId,
      query,
      user.id,
    );
  }

  @Get('/liked/get/')
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getLiked(
    @Query(new LangValidationPipe()) query: string,
    @Query('size') size: number,
    @Query('page') page: number,
    @GetAccount() user: UserEntity,
  ) {
    return await this.sewingProductService.getLiked(user.id, query, size, page);
  }

  @Put('/update/:sewingProductId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, SewingProductGuard)
  async update(
    @Param('sewingProductId') sewingProductId: string,
    @Body() body: SewingProductDto,
  ) {
    return await this.sewingProductService.update(sewingProductId, body);
  }

  @Put('/disable/:sewingProductId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, SewingProductGuard)
  async disable(
    @Param('sewingProductId') sewingProductId: string,
    @Body() body: { deleted: boolean },
  ) {
    return await this.sewingProductService.disable(
      sewingProductId,
      body.deleted,
    );
  }
  @Delete('/delete/:sewingProductId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, SewingProductGuard)
  async delete(@Param('sewingProductId') sewingProductId: string) {
    return await this.sewingProductService.delete(sewingProductId);
  }

  @Get('/get/for-update/:sewingProductId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, SewingProductGuard)
  async getOneForUpdate(
    @Query(new LangValidationPipe()) query,
    @Param('sewingProductId') sewingProductId: string,
  ) {
    return await this.sewingProductService.getOneForUpdate(
      sewingProductId,
      query,
    );
  }
}

// @Get('/pinned/get/')
// async getPinned(@Query(new LangValidationPipe()) query: string) {
//   return await this.sewingProductService.getPinned(query);
// }
// @Get('/auth/pinned/get/')
// @UseGuards(AuthGuard('jwt'), AccountGuard)
// async getPinnedAuth(
//   @Query(new LangValidationPipe()) query: string,
//   @GetAccount() user: UserEntity,
// ) {
//   return await this.sewingProductService.getPinnedAuth(query, user.id);
// }

// @Put('/update-pinned/:sewingProductId')
// @Roles(USER_ROLE.ADMIN)
// @UseGuards(AuthGuard('jwt'), AccountGuard, SewingProductGuard)
// async updatePinned(
//   @Param('sewingProductId') sewingProductId: string,
//   @Body() body: any,
// ) {
//   return await this.sewingProductService.updatePinned(sewingProductId, body);
// }
