import { FaqSizeEntity } from './faq-size.entity';
import { EntityRepository, getConnection, Repository } from 'typeorm';
import { CreateOrUpdateFaqSizeDto } from './dto/create-or-update-faq-size.dto';

@EntityRepository(FaqSizeEntity)
export class FaqSizeRepository extends Repository<FaqSizeEntity> {
  async createOrUpdate(body: CreateOrUpdateFaqSizeDto): Promise<void> {
    const isExist = await this.findOne({});
    if (Boolean(isExist)) {
      await getConnection()
        .createQueryBuilder()
        .update(FaqSizeEntity)
        .set({ data: body.data })
        .execute();
    } else {
      await this.save(body);
    }
  }
}
