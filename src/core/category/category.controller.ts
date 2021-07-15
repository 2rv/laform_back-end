import { CategoryDto } from './dto/category.dto';
import {
  Body,
  Controller,
  HttpStatus,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
  Response,
  UseGuards,
  ValidationPipe,
  Get,
  Put,
  Query,
  Delete,
  Request,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('/create')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async save(@Body(new ValidationPipe()) body: CategoryDto, @Response() res) {
    try {
      const result = await this.categoryService.create(body);
      return res.status(HttpStatus.CREATED).send(result);
    } catch (e) {
      Logger.log(e);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }

  @Get('get/:id')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getOne(
    @Query('lang') query: string,
    @Param('id') id: string,
    @Response() res,
  ) {
    try {
      const result = await this.categoryService.getOne(id, query);
      return res.status(HttpStatus.OK).send(result);
    } catch (error) {
      Logger.log(error);
    }
  }

  @Get('get/')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getAll(@Query('lang') query: string, @Response() res) {
    try {
      const result = await this.categoryService.getAll(query);
      return res.status(HttpStatus.OK).send(result);
    } catch (error) {
      Logger.log(error);
    }
  }

  @Put('update/:id')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async update(@Param('id') id: string, @Body() body: any, @Response() res) {
    try {
      const result = await this.categoryService.update(id, body);
      return res.status(HttpStatus.OK).send(result);
    } catch (error) {
      Logger.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }

  @Delete('delete/:id')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async delete(@Param('id') id: string, @Response() res) {
    try {
      const result = await this.categoryService.delete(id);
      return res.status(HttpStatus.OK).send(result);
    } catch (error) {
      Logger.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
