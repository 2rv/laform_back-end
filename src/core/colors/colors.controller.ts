import {
  Body,
  Controller,
  Param,
  Post,
  Response,
  UseGuards,
  ValidationPipe,
  Get,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { ColorsService } from './colors.service';
import { DeleteManyColorsDto } from './dto/delete-many-colors';

@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @Get('get/')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getAll() {
    return await this.colorsService.getAll();
  }

  @Delete('delete/:id')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async delete(@Param('id') id: string) {
    return await this.colorsService.delete(id);
  }

  @Delete('delete-many')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async deleteMany(@Body(new ValidationPipe()) body: DeleteManyColorsDto) {
    return await this.colorsService.deleteMany(body);
  }
}
