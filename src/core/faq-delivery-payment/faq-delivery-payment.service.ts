import { Injectable } from '@nestjs/common';
import { FaqDeliveryPaymentEntity } from './faq-delivery-payment.entity';
import { FaqDeliveryPaymentRepository } from './faq-delivery-payment.repository';
import { CreateOrUpdateFaqDeliveryPaymentDto } from './dto/create-or-update-faq-delivery-payment.dto';

@Injectable()
export class FaqDeliveryPaymentService {
  constructor(
    private faqDeliveryPaymentRepository: FaqDeliveryPaymentRepository,
  ) {}

  async get(): Promise<FaqDeliveryPaymentEntity> {
    return await this.faqDeliveryPaymentRepository.findOne({});
  }

  async save(body: CreateOrUpdateFaqDeliveryPaymentDto): Promise<void> {
    await this.faqDeliveryPaymentRepository.createOrUpdate(body);
  }
}
