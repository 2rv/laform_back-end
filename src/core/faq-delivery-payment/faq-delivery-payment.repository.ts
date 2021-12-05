import { FaqDeliveryPaymentEntity } from './faq-delivery-payment.entity';
import { EntityRepository, getConnection, Repository } from 'typeorm';
import { CreateOrUpdateFaqDeliveryPaymentDto } from './dto/create-or-update-faq-delivery-payment.dto';

@EntityRepository(FaqDeliveryPaymentEntity)
export class FaqDeliveryPaymentRepository extends Repository<FaqDeliveryPaymentEntity> {
  async createOrUpdate(
    body: CreateOrUpdateFaqDeliveryPaymentDto,
  ): Promise<void> {
    const isExist = await this.findOne({});
    if (Boolean(isExist)) {
      await getConnection()
        .createQueryBuilder()
        .update(FaqDeliveryPaymentEntity)
        .set({ data: body.data })
        .execute();
    } else {
      await this.save(body);
    }
  }
}
