import { PrivacyPolicyEntity } from './privacy-policy.entity';
import { EntityRepository, getConnection, Repository } from 'typeorm';

@EntityRepository(PrivacyPolicyEntity)
export class PrivacyPolicyRepository extends Repository<PrivacyPolicyEntity> {
  async createOrUpdate(body): Promise<any> {
    const privacyPolicyExists = await this.findOne({});

    if (Boolean(privacyPolicyExists)) {
      return await getConnection()
        .createQueryBuilder()
        .update(PrivacyPolicyEntity)
        .set({ privacyPolicy: body.privacyPolicy })
        .returning('*')
        .execute()
        .then((response) => response.raw[0]);
    } else {
      return await this.save(body);
    }
  }
}
