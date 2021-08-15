import { SliderEntity } from './slider.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(SliderEntity)
export class SliderRepository extends Repository<SliderEntity> {
  async getOne(id: string): Promise<SliderEntity> {
    return await this.createQueryBuilder('slider')
      .leftJoinAndSelect('slider.imageUrl', 'image_url')
      .leftJoinAndSelect('slider.categoryId', 'category_id')
      .where('slider.id = :id', { id })
      .getOne();
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
      .getOne();
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
      .getMany();
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
      .getOne();
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
      .getMany();
  }
}
