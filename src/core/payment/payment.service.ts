import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as md5 from 'md5';

import { PaymentRepository } from './payment.repository';
import { PayAnyWayConfig } from 'src/config/payanyway.config';
import { PaymentDto } from './dto/payment.dto';
import { PurchaseRepository } from '../purchase/purchase.repository';
import { PURCHASE_STATUS } from '../purchase/enum/purchase.status';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentRepository)
    private paymentRepository: PaymentRepository,
    private purchaseRepository: PurchaseRepository,
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

  async successLink(orderNumber: number): Promise<any> {
    const success = 'https://laform-client.herokuapp.com/paid';
    const fail = 'https://laform-client.herokuapp.com/not-paid';
    const purchase = await this.purchaseRepository.findOne({
      where: {
        orderNumber: orderNumber,
      },
    });
    if (purchase) {
      await this.purchaseRepository.update(purchase.id, {
        orderStatus: PURCHASE_STATUS.PAID,
      });
      return success;
    } else return fail;
  }
}
