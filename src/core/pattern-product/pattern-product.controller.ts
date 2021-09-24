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
import { UpdatePatternProductDto } from './dto/update-pattern-product.dto';
import { PatternProductDto } from './dto/pattern-product.dto';
import { GetAccount } from '../user/decorator/get-account.decorator';
import { UserEntity } from '../user/user.entity';

@Controller('pattern-product')
export class PatternProductController {
  constructor(private readonly patternProductService: PatternProductService) {}

  @Post('/create/')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async save(@Body(new ValidationPipe()) body: PatternProductDto) {
    return await this.patternProductService.create(body);
  }

  @Get('/get/')
  async getAll(
    @Query(new LangValidationPipe()) query: string,
    @Query('size') size: number,
    @Query('page') page: number,
  ) {
    return await this.patternProductService.getAll(query, size, page);
  }
  @Get('/auth/get/')
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getAllAuth(
    @Query(new LangValidationPipe()) query: string,
    @Query('size') size: number,
    @Query('page') page: number,
    @GetAccount() user: UserEntity,
  ) {
    return await this.patternProductService.getAllAuth(
      query,
      size,
      page,
      user.id,
    );
  }

  @Get('/get/:patternProductId')
  @UseGuards(PatternProductGuard)
  async getOne(@Query(new LangValidationPipe()) query, @Request() req) {
    return await this.patternProductService.getOne(req.patternProductId, query);
  }
  @Get('/auth/get/:patternProductId')
  @UseGuards(AuthGuard('jwt'), AccountGuard, PatternProductGuard)
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

  @Get('/pinned/get/')
  async getPinned(@Query(new LangValidationPipe()) query: string) {
    return await this.patternProductService.getPinned(query);
  }
  @Get('/auth/pinned/get/')
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getPinnedAuth(
    @Query(new LangValidationPipe()) query: string,
    @GetAccount() user: UserEntity,
  ) {
    return await this.patternProductService.getPinnedAuth(query, user.id);
  }

  @Put('/update/:patternProductId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, PatternProductGuard)
  async update(@Request() req, @Body() body: UpdatePatternProductDto) {
    return await this.patternProductService.update(req.patternProductId, body);
  }

  @Delete('/delete/:patternProductId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, PatternProductGuard)
  async delete(@Request() req) {
    return await this.patternProductService.delete(req.patternProductId);
  }

  @Get('/liked/')
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getLiked(
    @Query(new LangValidationPipe()) query: string,
    @GetAccount() user: UserEntity,
  ) {
    return await this.patternProductService.getLiked(user.id, query);
  }
}
