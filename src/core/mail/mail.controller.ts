import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../user/decorator/get-account.decorator';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { AccountGuard } from '../user/guard/account.guard';
import { UserEntity } from '../user/user.entity';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('/send')
  async send(@Body() body): Promise<any> {
    return await this.mailService.sendMessage(body, '123');
  }

  @Post('/notification')
  async notify(@Body() body: { subject: string; html: string }): Promise<any> {
    return await this.mailService.sendNotification(body);
  }

  @Post('/send-pdf')
  @Roles(USER_ROLE.ADMIN, USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async sendPdf(@GetUser() user: UserEntity, @Body() body): Promise<any> {
    return await this.mailService.sendPdf(user, body);
  }

  @Post('/send-purchased-products-info')
  @Roles(USER_ROLE.ADMIN, USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async sendPurchasedProductsInfo(
    @GetUser() user: UserEntity,
    @Body() body,
  ): Promise<any> {
    return await this.mailService.sendPurchasedProductsInfo(user, body);
  }

  @Post('/send-email-code')
  async confirmEmailForOrder(@Body() body): Promise<any> {
    return await this.mailService.confirmEmailForOrder(body);
  }
}
