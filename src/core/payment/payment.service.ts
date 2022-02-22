import {
  forwardRef,
  Inject,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as md5 from 'md5';
import { PaymentRepository } from './payment.repository';
import { PayAnyWayConfig } from 'src/config/payanyway.config';
import { PaymentDto } from './dto/payment.dto';
import { PurchaseRepository } from '../purchase/purchase.repository';
import { PURCHASE_STATUS } from '../purchase/enum/purchase.status';
import { SdekService } from '../sdek/sdek.service';
import { PurchaseProductRepository } from '../purchase-product/purchase-product.repository';
import { PurchaseService } from '../purchase/purchase.service';
import { SdekConfig } from 'src/config/sdek.config';
import { CdekCreateOrderDto } from '../sdek/dto/cdek-order';
import { PURCHASE_ERROR } from '../purchase/enum/purchase.enum';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentRepository)
    private paymentRepository: PaymentRepository,
    private purchaseRepository: PurchaseRepository,
    private sdekService: SdekService,
    private purchaseProductRepository: PurchaseProductRepository,
    @Inject(forwardRef(() => PurchaseService))
    private purchaseService: PurchaseService,
  ) {}

  async createTransaction(body): Promise<string> {
    return await this.paymentRepository.save(body);
  }

  async getPayAnyWayLink(body: PaymentDto, userId): Promise<string> {
    const signature = md5(
      PayAnyWayConfig.MNT_ID +
        body.orderNumber +
        body.amount +
        body.currency +
        userId +
        body.testMode +
        PayAnyWayConfig.MNT_INTEGRITY_CODE,
    );

    const url =
      PayAnyWayConfig.PAY_URL +
      `MNT_ID=` +
      PayAnyWayConfig.MNT_ID +
      `&MNT_AMOUNT=` +
      body.amount +
      `&MNT_TRANSACTION_ID=` +
      body.orderNumber +
      `&MNT_CURRENCY_CODE=` +
      body.currency +
      `&MNT_TEST_MODE=` +
      body.testMode +
      `&MNT_SUBSCRIBER_ID=` +
      userId +
      `&MNT_SIGNATURE=` +
      signature;

    return await url;
  }
  async getPayAnyWayLinkByPurchaseId(id: string, user): Promise<string> {
    const purchase = await this.purchaseRepository.findOne({
      where: {
        id: id,
        userId: user.id,
      },
    });

    if (
      !purchase &&
      (purchase.orderStatus === PURCHASE_STATUS.CREATED ||
        purchase.orderStatus === PURCHASE_STATUS.AWAITING_PAYMENT)
    ) {
      throw new BadRequestException(PURCHASE_ERROR.PURCHASE_NOT_FOUND);
    }

    const amount = (+purchase.price + +purchase.shippingPrice).toFixed(2);
    const currency = 'RUB';
    const testMode = 1;
    const signature = md5(
      PayAnyWayConfig.MNT_ID +
        purchase.orderNumber +
        amount +
        currency +
        user.id +
        testMode +
        PayAnyWayConfig.MNT_INTEGRITY_CODE,
    );
    const url =
      PayAnyWayConfig.PAY_URL +
      `MNT_ID=` +
      PayAnyWayConfig.MNT_ID +
      `&MNT_AMOUNT=` +
      amount +
      `&MNT_TRANSACTION_ID=` +
      purchase.orderNumber +
      `&MNT_CURRENCY_CODE=` +
      currency +
      `&MNT_TEST_MODE=` +
      testMode +
      `&MNT_SUBSCRIBER_ID=` +
      user.id +
      `&MNT_SIGNATURE=` +
      signature;

    return await url;
  }
  //http://localhost:4000/payment/redirect?MNT_ID=123&MNT_TRANSACTION_ID=0000000014&MNT_OPERATION_ID=123123
  async successLink(orderNumber: number): Promise<any> {
    const success = 'https://laforme-patterns.com/paid';
    const fail = 'https://laforme-patterns.com/not-paid';

    const purchase = await this.purchaseRepository.findOne({
      where: {
        orderNumber: orderNumber,
      },
    });

    if (purchase) {
      const items = [];
      await this.purchaseRepository.update(purchase.id, {
        orderStatus: PURCHASE_STATUS.PAID,
      });
      await this.purchaseService.sendPurchaseInfo(purchase.id);
      const product = await this.purchaseRepository.getOne(purchase.id);
      for (let purchaseProduct of product.purchaseProducts) {
        if (purchaseProduct.type === 0) {
          const expired = new Date();
          expired.setMonth(expired.getMonth() + 6);
          await this.purchaseProductRepository.update(purchaseProduct.id, {
            expiredDate: expired,
          });
        }
      }
      if (purchase.sdek === true) {
        let amount = 0;
        for (let purchaseProduct of product.purchaseProducts) {
          let count = 0;
          if (purchaseProduct.type === 2 || purchaseProduct.type === 3) {
            amount += +(purchaseProduct.totalCount * 1);
            count = purchaseProduct.totalCount * 1;
            let item = {
              ware_key: '00055',
              payment: {
                value: 0,
              },
              name: product.id,
              cost: 300,
              amount: count,
              weight: count * SdekConfig.weight,
              url: 'https://laforme-patterns.com',
            };
            items.push(item);
          }
        }
        const data: CdekCreateOrderDto = {
          tariff_code: purchase.sdekTariffCode,
          to_location: {
            code: purchase.sdekCityCode,
            address: purchase.address,
          },
          recipient: {
            name: purchase.fullName,
            phones: [
              {
                number: purchase.phone,
              },
            ],
          },
          packages: [
            {
              number: '2',
              height: SdekConfig.height,
              length: SdekConfig.length,
              weight: SdekConfig.weight * amount,
              width: SdekConfig.width,
              items: items,
            },
          ],
        };

        const s = await this.sdekService.createOrder(data);
        return success;
      }
      return success;
    } else return fail;
  }
}
