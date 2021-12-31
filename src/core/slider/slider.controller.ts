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
  Delete,
} from '@nestjs/common';
import { SliderService } from './slider.service';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { SliderGuard } from './guard/slider.guard';

@Controller('slider')
export class SliderController {
  constructor(private readonly sliderService: SliderService) {}

  @Get('get/')
  async getAll() {
    return await this.sliderService.getAll();
  }

  @Get('get/:sliderId')
  @UseGuards(SliderGuard)
  async getOne(@Param('sliderId') id: string) {
    return await this.sliderService.getOne(id);
  }

  @Post('/create')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async save(@Body(new ValidationPipe()) body: SliderDto) {
    return await this.sliderService.create(body);
  }

  @Put('update/:sliderId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, SliderGuard)
  async update(@Param('sliderId') id: string, @Body() body: SliderDto) {
    return await this.sliderService.update(id, body);
  }

  @Delete('delete/:sliderId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, SliderGuard)
  async delete(@Param('sliderId') id: string) {
    return await this.sliderService.delete(id);
  }
}
