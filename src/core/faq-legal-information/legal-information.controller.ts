import { Controller, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { LegalInformationService } from './legal-information.service';

@Controller('legal-information')
export class LegalInformationController {
  constructor(private legalInformationService: LegalInformationService) {}

  @Get('get')
  async get() {
    return await this.legalInformationService.get();
  }

  @Post('save')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async save(@Body() body) {
    return await this.legalInformationService.save(body);
  }
}
