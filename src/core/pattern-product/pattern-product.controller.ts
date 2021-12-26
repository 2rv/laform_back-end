import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
  Get,
  Put,
  Query,
  Delete,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { PatternProductService } from './pattern-product.service';
import { PatternProductGuard } from './guard/pattern-product.guard';
import { LangValidationPipe } from 'src/common/guards/lang.guard';
import { PatternProductDto } from './dto/pattern-product.dto';
import { GetAccount } from '../user/decorator/get-account.decorator';
import { UserEntity } from '../user/user.entity';
import { LangType } from 'src/common/enum/lang.enum';
import { PatternProductClickCountGuard } from './guard/pattern-product-click-count.guard';

@Controller('pattern-product')
export class PatternProductController {
  constructor(private patternProductService: PatternProductService) {}

  @Get('/get/')
  async getAll(
    @Query(new LangValidationPipe()) lang: LangType,
    @Query('size') size: number = 30,
    @Query('page') page: number = 1,
    @Query('by') by: 'DESC' | 'ASC' = 'DESC',
    @Query('sort') sort: string = 'date',
    @Query('where') where: string,
    @Query('type') type: 'printed' | 'electronic',
    @Query('category') category: string,
    @Query('getAll') getAll: boolean,
  ) {
    return await this.patternProductService.getAll({
      lang,
      size,
      page,
      sort,
      by,
      where,
      type,
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
    @Query('type') type: 'printed' | 'electronic' | '',
    @Query('category') category: string,
    @GetAccount() user: UserEntity,
  ) {
    return await this.patternProductService.getAll({
      lang,
      size,
      page,
      sort,
      by,
      where,
      type,
      category,
      userId: user.id,
    });
  }

  @Get('/get/:patternProductId')
  @UseGuards(PatternProductGuard, PatternProductClickCountGuard)
  async getOne(@Param('patternProductId') id: string) {
    return await this.patternProductService.getOne({
      id,
    });
  }

  @Get('/auth/get/:patternProductId')
  @UseGuards(
    AuthGuard('jwt'),
    AccountGuard,
    PatternProductGuard,
    PatternProductClickCountGuard,
  )
  async getOneAuth(
    @Param('patternProductId') id: string,
    @GetAccount() user: UserEntity,
  ) {
    return await this.patternProductService.getOne({
      id,
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
    @Query('type') type: 'printed' | 'electronic' | '',
    @Query('category') category: string,
    @GetAccount() user: UserEntity,
  ) {
    return await this.patternProductService.getLiked({
      lang,
      size,
      page,
      sort,
      by,
      where,
      type,
      category,
      userId: user.id,
    });
  }

  @Get('/get/for-update/:patternProductId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, PatternProductGuard)
  async getOneForUpdate(@Param('patternProductId') id: string) {
    return await this.patternProductService.getOneForUpdate(id);
  }

  @Post('/create/')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async save(@Body(new ValidationPipe()) body: PatternProductDto) {
    return await this.patternProductService.create(body);
  }

  @Put('/update/:patternProductId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, PatternProductGuard)
  async update(
    @Param('patternProductId') id: string,
    @Body() body: PatternProductDto,
  ) {
    return await this.patternProductService.update(id, body);
  }

  @Delete('/delete/:patternProductId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, PatternProductGuard)
  async delete(@Param('patternProductId') id: string) {
    return await this.patternProductService.delete(id);
  }

  @Put('/disable/:patternProductId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, PatternProductGuard)
  async disable(
    @Param('patternProductId') id: string,
    @Body() body: { deleted: boolean },
  ) {
    return await this.patternProductService.disable(id, body.deleted);
  }
}
