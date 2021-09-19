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
  Response,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { SewingProductService } from './sewing-product.service';
import { SewingProductGuard } from './guard/sewing-product.guard';
import { LangValidationPipe } from 'src/common/guards/lang.guard';
import { UpdateSewingProductDto } from './dto/update-sewing-product.dto';
import { SewingProductDto } from './dto/sewing-product.dto';

@Controller('sewing-product')
export class SewingProductController {
  constructor(private readonly sewingProductService: SewingProductService) {}

  @Post('/create')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async save(@Body(new ValidationPipe()) body: SewingProductDto) {
    return await this.sewingProductService.create(body);
  }

  @Get('get/:sewingProductId')
  @UseGuards(SewingProductGuard)
  async getOne(
    @Query(new LangValidationPipe()) query,
    @Param('sewingProductId') sewingProductId: string,
  ) {
    return await this.sewingProductService.getOne(sewingProductId, query);
  }

  @Get('get/')
  async getAll(
    @Query(new LangValidationPipe()) query: string,
    @Query('size') size: number,
    @Query('page') page: number,
    @Response() response,
  ) {
    const result = await this.sewingProductService.getAll(query, size, page);
    response.setHeader('Total-Records', result.total);
    return response.send(result.products);
  }

  @Get('pinned/get/')
  async getPinned(@Query(new LangValidationPipe()) query: string) {
    return await this.sewingProductService.getPinned(query);
  }

  @Put('update/:sewingProductId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, SewingProductGuard)
  async update(@Request() req, @Body() body: UpdateSewingProductDto) {
    return await this.sewingProductService.update(req.sewingProductId, body);
  }

  @Delete('delete/:sewingProductId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, SewingProductGuard)
  async delete(@Request() req) {
    return await this.sewingProductService.delete(req.sewingProductId);
  }
}
