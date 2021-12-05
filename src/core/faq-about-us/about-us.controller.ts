import { Controller, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { AboutUsService } from './about-us.service';

@Controller('about-us')
export class AboutUsController {
  constructor(private aboutUsService: AboutUsService) {}

  @Get('get')
  async get() {
    return await this.aboutUsService.get();
  }

  @Post('save')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async save(@Body() body) {
    return await this.aboutUsService.save(body);
  }
}
