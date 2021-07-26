import { MasterClassEntity } from './master-class.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(MasterClassEntity)
export class MasterClassRepository extends Repository<MasterClassEntity> {
  async getOne(id: string): Promise<MasterClassEntity> {
    return await this.createQueryBuilder('slider')
      .leftJoinAndSelect('slider.imageUrl', 'image_url')
      .leftJoinAndSelect('slider.categoryId', 'category_id')
      .where('slider.id = :id', { id })
      .getOne()
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }

  async findOneRu(id: string): Promise<MasterClassEntity> {
    return await this.createQueryBuilder('slider')
      .leftJoin('slider.imageUrl', 'image_url')
      .leftJoin('slider.categoryId', 'category_id')
      .where('slider.id = :id', { id })
      .select([
        'slider.id',
        'slider.headingTextRu',
        'slider.buttonTextRu',
        'slider.buttonUrl',
        'image_url',
        'category_id.textRu',
      ])
      .getOne()
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }

  async findAllRu(): Promise<MasterClassEntity[]> {
    return await this.createQueryBuilder('slider')
      .leftJoin('slider.imageUrl', 'image_url')
      .leftJoin('slider.categoryId', 'category_id')
      .select([
        'slider.id',
        'slider.headingTextRu',
        'slider.buttonTextRu',
        'slider.buttonUrl',
        'image_url',
        'category_id.textRu',
      ])
      .getMany()
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }

  async findOneEn(id: string): Promise<MasterClassEntity> {
    return await this.createQueryBuilder('slider')
      .leftJoin('slider.imageUrl', 'image_url')
      .leftJoin('slider.categoryId', 'category_id')
      .where('slider.id = :id', { id })
      .select([
        'slider.id',
        'slider.headingTextEn',
        'slider.buttonTextEn',
        'slider.buttonUrl',
        'image_url',
        'category_id.textEn',
      ])
      .getOne()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }

  async findAllEn(): Promise<MasterClassEntity[]> {
    return await this.createQueryBuilder('slider')
      .leftJoin('slider.imageUrl', 'image_url')
      .leftJoin('slider.categoryId', 'category_id')
      .select([
        'slider.id',
        'slider.headingTextEn',
        'slider.buttonTextEn',
        'slider.buttonUrl',
        'image_url',
        'category_id.textEn',
      ])
      .getMany()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }
}
