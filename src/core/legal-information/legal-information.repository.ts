import { LegalInformationEntity } from './legal-information.entity';
import { EntityRepository, getConnection, Repository } from 'typeorm';

@EntityRepository(LegalInformationEntity)
export class LegalInformationRepository extends Repository<LegalInformationEntity> {
  async createOrUpdate(body): Promise<any> {
    const legalInformationExists = await this.findOne({});

    if (Boolean(legalInformationExists)) {
      return await getConnection()
        .createQueryBuilder()
        .update(LegalInformationEntity)
        .set({ legalInformation: body.legalInformation })
        .returning('*')
        .execute()
        .then((response) => response.raw[0]);
    } else {
      return await this.save(body);
    }
  }
}
