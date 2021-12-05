import { Controller, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { FaqDeliveryPaymentService } from './faq-delivery-payment.service';

@Controller('faq-delivery-payment')
export class FaqDeliveryPaymentController {
  constructor(private faqDeliveryPaymentService: FaqDeliveryPaymentService) {}

  @Get('get')
  async get() {
    return await this.faqDeliveryPaymentService.get();
  }

  @Post('save')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async save(@Body() body) {
    return await this.faqDeliveryPaymentService.save(body);
  }
}
