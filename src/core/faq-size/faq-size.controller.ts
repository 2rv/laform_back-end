import { Controller, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { FaqSizeService } from './faq-size.service';

@Controller('faq-size')
export class FaqSizeController {
  constructor(private faqSizeService: FaqSizeService) {}

  @Get('/')
  async get() {
    return await this.faqSizeService.get();
  }

  @Post('/')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async save(@Body() body) {
    return await this.faqSizeService.save(body);
  }
}
