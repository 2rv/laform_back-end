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
import { LangValidationPipe } from '../../common/guards/lang.guard';
import { SliderGuard } from './guard/slider.guard';

@Controller('slider')
export class SliderController {
  constructor(private readonly sliderService: SliderService) {}

  @Post('/create')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async save(@Body(new ValidationPipe()) body: SliderDto) {
    return await this.sliderService.create(body);
  }

  @Get('get/:sliderId')
  @UseGuards(SliderGuard)
  async getOne(
    @Query(new LangValidationPipe()) query: string,
    @Param('sliderId') id: string,
  ) {
    return await this.sliderService.getOne(id, query);
  }

  @Get('get/')
  async getAll(@Query(new LangValidationPipe()) query: string) {
    return await this.sliderService.getAll(query);
  }

  @Put('update/:sliderId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, SliderGuard)
  async update(@Param('sliderId') id: string, @Body() body: any) {
    return await this.sliderService.update(id, body);
  }

  @Delete('delete/:sliderId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, SliderGuard)
  async delete(@Param('sliderId') id: string) {
    return await this.sliderService.delete(id);
  }
}
