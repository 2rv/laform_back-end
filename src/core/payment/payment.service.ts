import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as md5 from 'md5';

import { PaymentRepository } from './payment.repository';
import { PayAnyWayConfig } from 'src/config/payanyway.config';
import { PaymentDto } from './dto/payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentRepository)
    private paymentRepository: PaymentRepository,
  ) {}

  async createTransaction(body): Promise<string> {
    return await this.paymentRepository.save(body);
  }

  async getPayAnyWayLink(body: PaymentDto, user): Promise<string> {
    const signature = md5(
      PayAnyWayConfig.MNT_ID +
        body.orderNumber +
        body.amount +
        body.currency +
        user.id +
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
      user.id +
      `&MNT_SIGNATURE=` +
      signature;

    return await url;
  }
}
