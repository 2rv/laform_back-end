import { CategoryDto } from './dto/category.dto';
import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
  Get,
  Query,
  Delete,
  Patch,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { CategoryEntity } from './category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('/create')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async save(
    @Body(new ValidationPipe()) body: CategoryDto,
  ): Promise<CategoryEntity> {
    return await this.categoryService.create(body);
  }

  @Get('get/:id')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getOne(
    @Query('lang') query: string,
    @Param('id') id: string,
  ): Promise<CategoryEntity> {
    return await this.categoryService.getOne(id, query);
  }

  @Get('get/')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getAll(@Query('lang') query: string): Promise<CategoryEntity[]> {
    return await this.categoryService.getAll(query);
  }

  @Patch('update/:id')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async update(@Param('id') id: string, @Body() body: any) {
    return await this.categoryService.update(id, body);
  }

  @Delete('delete/:id')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async delete(@Param('id') id: string) {
    return await this.categoryService.delete(id);
  }
}
