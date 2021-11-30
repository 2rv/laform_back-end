import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Cache } from 'cache-manager';
import * as path from 'path';
import { UserEntity } from '../user/user.entity';
import { randomUUID } from 'src/common/utils/hash';
import { UserRepository } from '../user/user.repository';
import { MailDto } from './dto/mail.dto';
import { PurchaseEntity } from '../purchase/purchase.entity';
import { PURCHASE_STATUS_INFO } from '../purchase/enum/purchase.status';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { generateAuthCode } from 'src/common/utils/generate-auth-code';

@Injectable()
export class MailService {
  constructor(
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
        html: `<p style="font-size: 20px;">PDF версии товара - <b>${body.productName}</b></p>`,
        attachments: body.filesPdf.map((file) => ({
          filename: file.fileUrl.split('.com/')[1],
          path: file.fileUrl,
          contentType: 'application/pdf',
        })),
      })
      .catch((e) => {
        console.log(e);
      });
  }
  async sendVerificationCode(body: MailDto) {
    const code = generateAuthCode();
    await this.cacheManager.set(`AuthBasketEmailCodeFor${body.email}`, code);
    return await this.mailerService
      .sendMail({
        to: body.email,
        subject: 'Подтвердите почту для совершения покупки',
        text: `Подтвердите почту для совершения покупки`,
        template: path.join(
          path.resolve(),
          'src/templates/confirm-email-for-order.pug',
        ),
        context: {
          code: code.toUpperCase(),
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
          phone: body.phone,
          price: Number(body.price) + (Number(body.shippingPrice) || 0),
          shippingPrice: body.shippingPrice,
          deliveryMethod: body.typeOfDelivery,
          purchasedProducts: body.purchaseProducts,
          orderNumber: body.orderNumber,
          orderStatus: PURCHASE_STATUS_INFO[body.orderStatus || 0],
          orderStatusNum: body.orderStatus || 0,
        },
      })
      .catch((e) => {
        console.log(e);
      });
  }
  async sendAdminNewOrderInfo(body: PurchaseEntity) {
    const admins = await this.userRepository.getAdminsToNotificationNewOrder();
    return await this.mailerService
      .sendMail({
        to: admins.map((item) => item.email),
        subject: 'La`forme Patterns, оформлен новый заказ',
        template: path.join(
          path.resolve(),
          'src/templates/admin-new-purchase-info.pug',
        ),
        context: {
          address: body.city,
          fullName: body.fullName,
          phone: body.phone,
          price: Number(body.price) + (Number(body.shippingPrice) || 0),
          shippingPrice: body.shippingPrice,
          deliveryMethod: body.typeOfDelivery,
          purchasedProducts: body.purchaseProducts,
          orderNumber: body.orderNumber,
          orderStatus: PURCHASE_STATUS_INFO[body.orderStatus || 0],
          orderStatusNum: body.orderStatus || 0,
          orderId: body.id,
        },
      })
      .catch((e) => {
        console.log(e);
      });
  }
  async sendUpdatedPurchaseInfo(email: string, body: PurchaseEntity) {
    return await this.mailerService
      .sendMail({
        to: email,
        subject: 'La`forme Patterns, статус покупки был обновлен',
        template: path.join(path.resolve(), 'src/templates/purchase-info.pug'),
        context: {
          address: body.city,
          fullName: body.fullName,
          phone: body.phone,
          price: Number(body.price) + (Number(body.shippingPrice) || 0),
          shippingPrice: body.shippingPrice,
          deliveryMethod: body.typeOfDelivery,
          purchasedProducts: body.purchaseProducts,
          orderNumber: body.orderNumber,
          orderStatus: PURCHASE_STATUS_INFO[body.orderStatus || 0],
          orderStatusNum: body.orderStatus || 0,
        },
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async sendFeedback(body: any) {
    const recipients = await this.userRepository.find();
    return recipients.map(async (recipient) => {
      if (recipient.role === USER_ROLE.ADMIN) {
        return await this.mailerService
          .sendMail({
            to: recipient.email,
            subject: 'La`forme Patterns, Обратная связь',
            template: path.join(path.resolve(), 'src/templates/feedback.pug'),
            context: {
              description: body.description,
            },
          })
          .catch((e) => console.log(e));
      }
    });
  }
  async sendPasswordForNewCreatedUserAfterPurchase(data: {
    email: string;
    password: string;
    login: string;
  }) {
    return await this.mailerService
      .sendMail({
        to: data.email,
        subject: 'La`forme Patterns, данные для входа',
        template: path.join(
          path.resolve(),
          'src/templates/data-new-created-user-after-purchase.pug',
        ),
        context: {
          password: data.password,
          login: data.login,
        },
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
