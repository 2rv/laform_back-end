import { Body, Controller, Post } from '@nestjs/common';
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
}
