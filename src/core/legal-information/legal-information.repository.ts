import { LegalInformationEntity } from './legal-information.entity';
import { EntityRepository, getConnection, Repository } from 'typeorm';
import { CreateOrUpdateLegalInformationDto } from './dto/create-or-update-legal-information.dto';

@EntityRepository(LegalInformationEntity)
export class LegalInformationRepository extends Repository<LegalInformationEntity> {
  async createOrUpdate(body: CreateOrUpdateLegalInformationDto): Promise<void> {
    const legalInformationExists = await this.findOne({});

    if (Boolean(legalInformationExists)) {
      await getConnection()
        .createQueryBuilder()
        .update(LegalInformationEntity)
        .set({ legalInformation: body.legalInformation })
        .execute();
    } else {
      await this.save(body);
    }
  }
}
