import { forwardRef, Inject, Injectable } from '@nestjs/common';
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
// import { PurchaseService } from '../purchase/purchase.service';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentRepository)
    private paymentRepository: PaymentRepository,
    private purchaseRepository: PurchaseRepository,
    private sdekService: SdekService,
    private purchaseProductRepository: PurchaseProductRepository,
    @Inject(forwardRef(() => PurchaseService))
    private purchaseService: PurchaseService, // @Inject(forwardRef(() => PurchaseService))
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
  //http://localhost:4000/payment/redirect?MNT_ID=123&MNT_TRANSACTION_ID=0000000014&MNT_OPERATION_ID=123123
  async successLink(orderNumber: number): Promise<any> {
    const success = 'https://laform-client.herokuapp.com/paid';
    const fail = 'https://laform-client.herokuapp.com/not-paid';

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
      if (purchase.sdek === true) {
        const printedProducts = await this.purchaseProductRepository.printed(
          purchase.id,
        );
        for (let printedProduct of printedProducts) {
          let item = {
            ware_key: '00055',
            payment: {
              value: 0,
            },
            name: printedProduct.id,
            cost: 300,
            amount: 1,
            weight: 700,
            url: 'www.item.ru',
          };
          items.push(item);
        }
        const data = {
          tariff_code: purchase.sdekTariffCode,
          to_location: {
            code: purchase.sdekCityCode,
            city: purchase.city,
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
              height: 10,
              length: 10,
              weight: 4000,
              width: 10,
              items: items,
            },
          ],
        };

        const s = await this.sdekService.createOrder(data);
        console.log(s);
        return success;
      }

      return success;
    } else return fail;
  }
}
