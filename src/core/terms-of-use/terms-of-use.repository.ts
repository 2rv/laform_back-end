import { TermsOfUseEntity } from './terms-of-use.entity';
import { EntityRepository, getConnection, Repository } from 'typeorm';
import { CreateOrUpdateTermsOfUseDto } from './dto/create-or-update-terms-of-use.dto';

@EntityRepository(TermsOfUseEntity)
export class TermsOfUseRepository extends Repository<TermsOfUseEntity> {
  async createOrUpdate(body: CreateOrUpdateTermsOfUseDto): Promise<void> {
    const termsOfUseExists = await this.findOne({});

    if (Boolean(termsOfUseExists)) {
      await getConnection()
        .createQueryBuilder()
        .update(TermsOfUseEntity)
        .set({ termsOfUse: body.termsOfUse })
        .execute();
    } else {
      await this.save(body);
    }
  }
}
