import { FaqEntity } from './faq.entity';
import { EntityRepository, getConnection, Repository } from 'typeorm';
import { CreateOrUpdateFaqDto } from './dto/create-or-update-faq.dto';

@EntityRepository(FaqEntity)
export class FaqRepository extends Repository<FaqEntity> {
  async createOrUpdate(body: CreateOrUpdateFaqDto): Promise<void> {
    const faqExists = await this.findOne({});

    if (Boolean(faqExists)) {
      await getConnection()
        .createQueryBuilder()
        .update(FaqEntity)
        .set({ faq: body.faq })
        .execute();
    } else {
      await this.save(body);
    }
  }
}
