import { AboutUsEntity } from './about-us.entity';
import { EntityRepository, getConnection, Repository } from 'typeorm';

@EntityRepository(AboutUsEntity)
export class AboutUsRepository extends Repository<AboutUsEntity> {
  async createOrUpdate(body): Promise<any> {
    const aboutUsExists = await this.findOne({});

    if (Boolean(aboutUsExists)) {
      return await getConnection()
        .createQueryBuilder()
        .update(AboutUsEntity)
        .set({ about: body.about })
        .returning('*')
        .execute()
        .then((response) => response.raw[0]);
    } else {
      return await this.save(body);
    }
  }
}
