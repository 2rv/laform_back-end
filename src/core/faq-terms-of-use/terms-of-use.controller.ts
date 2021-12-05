import { Controller, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { TermsOfUseService } from './terms-of-use.service';

@Controller('terms-of-use')
export class TermsOfUseController {
  constructor(private termsOfUseService: TermsOfUseService) {}

  @Get('get')
  async get() {
    return await this.termsOfUseService.get();
  }

  @Post('save')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async save(@Body() body) {
    return await this.termsOfUseService.save(body);
  }
}
