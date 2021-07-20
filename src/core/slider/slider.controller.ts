import { SliderDto } from './dto/slider.dto';
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
import { SliderService } from './slider.service';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';

@Controller('slider')
export class SliderController {
  constructor(private readonly sliderService: SliderService) {}

  @Post('/create')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async save(@Body(new ValidationPipe()) body: SliderDto) {
    return await this.sliderService.create(body);
  }

  @Get('get/:id')
  async getOne(@Query('lang') query, @Param('id') id: string) {
    return await this.sliderService.getOne(id, query);
  }

  @Get('get/')
  async getAll(@Query('lang') query: string) {
    return await this.sliderService.getAll(query);
  }

  @Put('update/:id')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async update(@Param('id') id: string, @Body() body: any) {
    return await this.sliderService.update(id, body);
  }

  @Delete('delete/:id')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async delete(@Param('id') id: string) {
    return await this.sliderService.delete(id);
  }
}
