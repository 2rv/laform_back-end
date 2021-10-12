import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationEntity } from '../notification/notification.entity';

import * as path from 'path';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class MailService {
  constructor(
    @InjectRepository(NotificationEntity)
    private notificationRepository: Repository<NotificationEntity>,
    private readonly mailerService: MailerService,
  ) {}

  async sendMessage(body: any, code: string) {
    return await this.mailerService
      .sendMail({
        to: body.toMail,
        subject: 'Подтверждение регистрации',
        text: `Для подтверждения регистрации перейдите по ссылке http://localhost:3000/auth/verificate-email/confirm?code=${code}`,
        template: path.join(path.resolve(), 'src/templates/mail.pug'),
        context: {
          mail: body.toMail,
          code: code,
        },
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async sendRecoveryMessage(body: any, code: string) {
    return await this.mailerService
      .sendMail({
        to: body.toMail,
        subject: 'Смена пароля',
        text: `Для смены пароля перейдите по ссылке http://localhost:3000/auth/change-password?code=${code}`,
        template: path.join(path.resolve(), 'src/templates/recovery.pug'),
        context: {
          mail: body.toMail,
          code: code,
        },
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async sendNotification(body: { subject: string; html: string }) {
    const recipients = await this.notificationRepository.find();
    const mails = recipients.map((e) => e.email);
    console.log(body.html);
    return await this.mailerService
      .sendMail({
        to: mails,
        subject: body.subject,
        template: path.join(path.resolve(), 'src/templates/notification.pug'),
        context: {
          htmlContent: body.html,
        },
      })
      .catch((e) => console.log(e));
  }

  async sendPdf(user: UserEntity, body: any) {
    return await this.mailerService
      .sendMail({
        to: user.email,
        subject: 'La`forme Patterns, скачивание pdf товара',
        html: `<p style="font-size: 20px;">PDF версия товара - <b>${body.productName}</b></p>`,
        attachments: [
          {
            filename: `${body.productName}.pdf`,
            path: body.productPdfUrl,
            contentType: 'application/pdf',
          },
        ],
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async sendPurchasedProductsInfo(user: UserEntity, body: any) {
    return await this.mailerService
      .sendMail({
        to: user.email,
        subject: 'La`forme Patterns, информация о купленных продуктах',
        template: path.join(
          path.resolve(),
          'src/templates/purchased-products-info.pug',
        ),
        context: {
          address: body.purchase.city,
          fullName: body.purchase.fullName,
          phone: body.purchase.phoneNumber,
          totalPrice: body.totalPrice,
          purchasedProducts: body.purchaseProducts,
        },
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
