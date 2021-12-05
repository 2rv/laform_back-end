import { AboutUsEntity } from './about-us.entity';
import { EntityRepository, getConnection, Repository } from 'typeorm';
import { CreateOrUpdateAboutUsDto } from './dto/create-or-update-about-us.dto';

@EntityRepository(AboutUsEntity)
export class AboutUsRepository extends Repository<AboutUsEntity> {
  async createOrUpdate(body: CreateOrUpdateAboutUsDto): Promise<void> {
    const aboutUsExists = await this.findOne({});

    if (Boolean(aboutUsExists)) {
      await getConnection()
        .createQueryBuilder()
        .update(AboutUsEntity)
        .set({ about: body.about })
        .execute();
    } else {
      await this.save(body);
    }
  }
}
