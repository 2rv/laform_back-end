import { Controller, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { PrivacyPolicyService } from './privacy-policy.service';

@Controller('privacy-policy')
export class PrivacyPolicyController {
  constructor(private privacyPolicyService: PrivacyPolicyService) {}

  @Get('get')
  async get() {
    return await this.privacyPolicyService.get();
  }

  @Post('save')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async save(@Body() body) {
    return await this.privacyPolicyService.save(body);
  }
}
