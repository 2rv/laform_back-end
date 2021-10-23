import { FaqEntity } from './faq.entity';
import { EntityRepository, getConnection, Repository } from 'typeorm';

@EntityRepository(FaqEntity)
export class FaqRepository extends Repository<FaqEntity> {
  async createOrUpdate(body): Promise<any> {
    const faqExists = await this.findOne({});

    if (Boolean(faqExists)) {
      return await getConnection()
        .createQueryBuilder()
        .update(FaqEntity)
        .set({ faq: body.faq })
        .returning('*')
        .execute()
        .then((response) => response.raw[0]);
    } else {
      return await this.save(body);
    }
  }
}
