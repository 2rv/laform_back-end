import { SliderEntity } from './slider.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(SliderEntity)
export class SliderRepository extends Repository<SliderEntity> {
  async getOne(id: string): Promise<SliderEntity> {
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

  async findOneRu(id: string): Promise<SliderEntity> {
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

  async findAllRu(): Promise<SliderEntity[]> {
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

  async findOneEn(id: string): Promise<SliderEntity> {
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

  async findAllEn(): Promise<SliderEntity[]> {
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
