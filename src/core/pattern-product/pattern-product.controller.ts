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
import { PatternProductService } from './pattern-product.service';
import { PatternProductGuard } from './guard/pattern-product.guard';
import { LangValidationPipe } from 'src/common/guards/lang.guard';
import { UpdatePatternProductDto } from './dto/update-pattern-product.dto';
import { PatternProductDto } from './dto/pattern-product.dto';

@Controller('pattern-product')
export class PatternProductController {
  constructor(private readonly patternProductService: PatternProductService) {}

  @Post('/create')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async save(@Body(new ValidationPipe()) body: PatternProductDto) {
    return await this.patternProductService.create(body);
  }

  @Get('get/:patternProductId')
  @UseGuards(PatternProductGuard)
  async getOne(
    @Query(new LangValidationPipe()) query,
    @Param('patternProductId') patternProductId: string,
  ) {
    return await this.patternProductService.getOne(patternProductId, query);
  }

  @Get('get/')
  async getAll(
    @Query(new LangValidationPipe()) query: string,
    @Query('size') size: number,
    @Query('page') page: number,
  ) {
    return await this.patternProductService.getAll(query, size, page);
  }

  @Get('pinned/get/')
  async getPinned(@Query(new LangValidationPipe()) query: string) {
    return await this.patternProductService.getPinned(query);
  }

  @Put('update/:patternProductId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, PatternProductGuard)
  async update(
    @Param('patternProductId') patternProductId: string,
    @Body() body: UpdatePatternProductDto,
  ) {
    return await this.patternProductService.update(patternProductId, body);
  }

  @Delete('delete/:patternProductId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, PatternProductGuard)
  async delete(@Param('patternProductId') patternProductId: string) {
    return await this.patternProductService.delete(patternProductId);
  }
}
