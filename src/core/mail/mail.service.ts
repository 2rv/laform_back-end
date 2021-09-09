import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as path from 'path';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

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

  async sendPdf(user: UserEntity, body: any) {
    return await this.mailerService
      .sendMail({
        to: user.email,
        subject: `Laforme, скачивание pdf товара`,
        html: `<p style="font-size: 20px;">PDF версия товара - <b>${body.productName}</b></p>`,
        attachments: [
          {
            filename: `${body.productName}.pdf`,
            path: body.productPdfUrl,
            contentType: 'application/pdf',
          },
        ]
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
