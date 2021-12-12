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
  Request,
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
import { PageNavigationGuard } from '../page-navigation/guard/page-navigationt.guard';

@Controller('pattern-product')
export class PatternProductController {
  constructor(private readonly patternProductService: PatternProductService) {}

  @Post('/create/')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async save(@Body(new ValidationPipe()) body: PatternProductDto) {
    return await this.patternProductService.create(body);
  }

  @Get('/create/mass')
  // @Roles(USER_ROLE.ADMIN)
  // @UseGuards(AuthGuard('jwt'), AccountGuard)
  async saveMass(@Body() body) {
    return await this.patternProductService.createMass(body);
  }

  @Get('/get/')
  async getAll(
    @Query(new LangValidationPipe()) query: string,
    @Query('size') size: number,
    @Query('sort') sort: string,
    @Query('page') page: number,
    @Query('by') by: any,
    @Query('where') where: string,
    @Query('type') type: string,
    @Query('category') category: string,
    @Query('getAll') getAll: boolean,
  ) {
    return await this.patternProductService.getAll(
      query,
      size,
      page,
      sort,
      by,
      where,
      type,
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
    @Query('by') by: any,
    @Query('where') where: string,
    @Query('type') type: string,
    @Query('category') category: string,
    @GetAccount() user: UserEntity,
  ) {
    return await this.patternProductService.getAllAuth(
      query,
      size,
      page,
      sort,
      by,
      where,
      type,
      category,
      user.id,
    );
  }

  @Get('/get/:patternProductId')
  @UseGuards(PatternProductGuard)
  @UseGuards(PageNavigationGuard)
  async getOne(@Query(new LangValidationPipe()) query, @Request() req) {
    return await this.patternProductService.getOne(req.patternProductId, query);
  }
  @Get('/auth/get/:patternProductId')
  @UseGuards(AuthGuard('jwt'), AccountGuard, PatternProductGuard)
  @UseGuards(PageNavigationGuard)
  async getOneAuth(
    @Query(new LangValidationPipe()) query,
    @Request() req,
    @GetAccount() user: UserEntity,
  ) {
    return await this.patternProductService.getOneAuth(
      req.patternProductId,
      query,
      user.id,
    );
  }

  @Put('/update/:patternProductId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, PatternProductGuard)
  async update(@Request() req, @Body() body: PatternProductDto) {
    return await this.patternProductService.update(req.patternProductId, body);
  }

  @Delete('/delete/:patternProductId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, PatternProductGuard)
  async delete(@Request() req) {
    return await this.patternProductService.delete(req.patternProductId);
  }

  @Put('/disable/:patternProductId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, PatternProductGuard)
  async disable(@Request() req, @Body() body: { deleted: boolean }) {
    return await this.patternProductService.disable(
      req.patternProductId,
      body.deleted,
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
    return await this.patternProductService.getLiked(
      user.id,
      query,
      size,
      page,
    );
  }

  @Get('/get/for-update/:patternProductId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, PatternProductGuard)
  async getOneForUpdate(
    @Query(new LangValidationPipe()) query,
    @Request() req,
  ) {
    return await this.patternProductService.getOneForUpdate(
      req.patternProductId,
      query,
    );
  }
}
