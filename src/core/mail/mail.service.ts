import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendPurchaseInformation(body: any) {
    await this.mailerService.sendMail({
      to: body.email,
      from: '"LaFrame Team" <laframetest@gmail.com>', // override default from
      subject: 'Thank U for purchase',
      template: '',
      context: {
        // ✏️ filling curly brackets with content
        // purchaseProducts: body.purchaseProducts, -- send to template
      },
    });
  }
}
