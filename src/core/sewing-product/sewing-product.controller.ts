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
import { LangType } from 'src/common/enum/lang.enum';
import { SewingProductClickCountGuard } from './guard/sewing-product-click-count.guard';

@Controller('sewing-product')
export class SewingProductController {
  constructor(private sewingProductService: SewingProductService) {}

  @Get('/get/')
  async getAll(
    @Query(new LangValidationPipe()) lang: LangType,
    @Query('size') size: number = 30,
    @Query('page') page: number = 1,
    @Query('by') by: 'DESC' | 'ASC' = 'DESC',
    @Query('sort') sort: string,
    @Query('where') where: string,
    @Query('category') category: string,
    @Query('getAll') getAll: boolean,
  ) {
    return await this.sewingProductService.getAll({
      lang,
      size,
      page,
      sort,
      by,
      where,
      category,
      getAll,
    });
  }
  @Get('/auth/get/')
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getAllAuth(
    @Query(new LangValidationPipe()) lang: LangType,
    @Query('size') size: number = 30,
    @Query('page') page: number = 1,
    @Query('by') by: 'DESC' | 'ASC' = 'DESC',
    @Query('sort') sort: string,
    @Query('where') where: string,
    @Query('category') category: string,
    @GetAccount() user: UserEntity,
  ) {
    return await this.sewingProductService.getAll({
      lang,
      size,
      page,
      sort,
      by,
      where,
      category,
      userId: user.id,
    });
  }
  @Get('/liked/get/')
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getLiked(
    @Query(new LangValidationPipe()) lang: LangType,
    @Query('size') size: number = 30,
    @Query('page') page: number = 1,
    @Query('by') by: 'DESC' | 'ASC' = 'DESC',
    @Query('sort') sort: string,
    @Query('where') where: string,
    @Query('category') category: string,
    @GetAccount() user: UserEntity,
  ) {
    return await this.sewingProductService.getLiked({
      lang,
      size,
      page,
      sort,
      by,
      where,
      category,
      userId: user.id,
    });
  }

  @Get('/get/:sewingProductId')
  @UseGuards(SewingProductGuard, SewingProductClickCountGuard)
  async getOne(@Param('sewingProductId') id: string) {
    return await this.sewingProductService.getOne({ id });
  }
  @Get('/auth/get/:sewingProductId')
  @UseGuards(
    AuthGuard('jwt'),
    AccountGuard,
    SewingProductGuard,
    SewingProductClickCountGuard,
  )
  async getOneAuth(
    @Param('sewingProductId') id: string,
    @GetAccount() user: UserEntity,
  ) {
    return await this.sewingProductService.getOne({ id, userId: user.id });
  }

  @Get('/get/for-update/:sewingProductId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, SewingProductGuard)
  async getOneForUpdate(@Param('sewingProductId') id: string) {
    return await this.sewingProductService.getOneForUpdate(id);
  }

  @Post('/create/')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async save(@Body(new ValidationPipe()) body: SewingProductDto) {
    return await this.sewingProductService.create(body);
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
}
