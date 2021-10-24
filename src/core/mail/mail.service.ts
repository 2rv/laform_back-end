import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Cache } from 'cache-manager';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationEntity } from '../notification/notification.entity';

import * as path from 'path';
import { UserEntity } from '../user/user.entity';
import { randomUUID } from 'src/common/utils/hash';
import { UserRepository } from '../user/user.repository';
import { generateVendorCode } from 'src/common/utils/vendor-coder';
import { MailDto } from './dto/mail.dto';
import { PurchaseEntity } from '../purchase/purchase.entity';

@Injectable()
export class MailService {
  constructor(
    @InjectRepository(NotificationEntity)
    private notificationRepository: Repository<NotificationEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly mailerService: MailerService,
    private userRepository: UserRepository,
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
    const recipients = await this.userRepository.find();
    return recipients.map(async (recipient) => {
      const payload = { email: recipient.email };
      const code = randomUUID();
      await this.cacheManager.set(code, JSON.stringify(payload));
      const findedUser = await this.userRepository.findOne(payload);

      if (findedUser?.notificationEmail === true) {
        return await this.mailerService
          .sendMail({
            to: recipient.email,
            subject: body.subject,
            template: path.join(
              path.resolve(),
              'src/templates/notification.pug',
            ),
            context: {
              htmlContent: body.html,
              code,
            },
          })
          .catch((e) => console.log(e));
      }
    });
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

  async sendPurchaseInfo(email: string, body: PurchaseEntity) {
    return await this.mailerService
      .sendMail({
        to: email,
        subject: 'La`forme Patterns, информация о купленных продуктах',
        template: path.join(path.resolve(), 'src/templates/purchase-info.pug'),
        context: {
          address: body.city,
          fullName: body.fullName,
          phone: body.phoneNumber,
          price: body.price,
          purchasedProducts: body.purchaseProducts,
          orderNumber: body.orderNumber,
          status: body.orderStatus,
        },
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async sendVerificationCode(body: MailDto) {
    const code = generateVendorCode();
    await this.cacheManager.set(`AuthBasketEmailCodeFor${body.email}`, code);
    return await this.mailerService
      .sendMail({
        to: body.email,
        subject: 'Подтверждение почту для совершения покупок',
        text: `Подтвердите почту для совершения покупок`,
        template: path.join(
          path.resolve(),
          'src/templates/confirm-email-for-order.pug',
        ),
        context: {
          code,
        },
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async sendInfoAboutOrderStatus(orderProducts: PurchaseEntity) {
    return await this.mailerService
      .sendMail({
        to: orderProducts.email,
        subject: `Статус заказа ${orderProducts.orderNumber} изменен`,
        template: path.join(
          path.resolve(),
          'src/templates/info-about-order-status.pug',
        ),
        context: {
          fullName: orderProducts.fullName,
          purchasedProducts: orderProducts.purchaseProducts,
          status: orderProducts.orderStatus,
        },
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
