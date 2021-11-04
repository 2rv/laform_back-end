import { PrivacyPolicyEntity } from './privacy-policy.entity';
import { EntityRepository, getConnection, Repository } from 'typeorm';
import { CreateOrUpdatePrivacyPolicyDto } from './dto/create-or-update-privacy-policy.dto';

@EntityRepository(PrivacyPolicyEntity)
export class PrivacyPolicyRepository extends Repository<PrivacyPolicyEntity> {
  async createOrUpdate(body: CreateOrUpdatePrivacyPolicyDto): Promise<void> {
    const privacyPolicyExists = await this.findOne({});

    if (Boolean(privacyPolicyExists)) {
      await getConnection()
        .createQueryBuilder()
        .update(PrivacyPolicyEntity)
        .set({ privacyPolicy: body.privacyPolicy })
        .execute();
    } else {
      await this.save(body);
    }
  }
}
