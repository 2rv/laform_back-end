import { SliderEntity } from './slider.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(SliderEntity)
export class SliderRepository extends Repository<SliderEntity> {
  async getOne(id: string): Promise<SliderEntity> {
    return await this.createQueryBuilder('slider')
      .leftJoinAndSelect('slider.imageUrl', 'image_url')
      .where('slider.id = :id', { id })
      .getOne();
  }

  async findOneRu(id: string): Promise<SliderEntity> {
    return await this.createQueryBuilder('slider')
      .leftJoin('slider.imageUrl', 'image_url')
      .where('slider.id = :id', { id })
      .select([
        'slider.id',
        'slider.headingTextRu',
        'slider.buttonTextRu',
        'slider.buttonUrl',
        'slider.titleTextColor',
        'slider.buttonColor',
        'slider.buttonTextColor',
        'slider.isHaveButton',
        'image_url',
      ])
      .getOne();
  }

  async findAllRu(): Promise<SliderEntity[]> {
    return await this.createQueryBuilder('slider')
      .leftJoin('slider.imageUrl', 'image_url')
      .select([
        'slider.id',
        'slider.headingTextRu',
        'slider.buttonTextRu',
        'slider.buttonUrl',
        'slider.titleTextColor',
        'slider.buttonColor',
        'slider.buttonTextColor',
        'slider.isHaveButton',
        'image_url',
      ])
      .getMany();
  }

  async findOneEn(id: string): Promise<SliderEntity> {
    return await this.createQueryBuilder('slider')
      .leftJoin('slider.imageUrl', 'image_url')
      .where('slider.id = :id', { id })
      .select([
        'slider.id',
        'slider.headingTextEn',
        'slider.buttonTextEn',
        'slider.buttonUrl',
        'slider.titleTextColor',
        'slider.buttonColor',
        'slider.buttonTextColor',
        'slider.isHaveButton',
        'image_url',
      ])
      .getOne();
  }

  async findAllEn(): Promise<SliderEntity[]> {
    return await this.createQueryBuilder('slider')
      .leftJoin('slider.imageUrl', 'image_url')
      .select([
        'slider.id',
        'slider.headingTextEn',
        'slider.buttonTextEn',
        'slider.buttonUrl',
        'slider.titleTextColor',
        'slider.buttonColor',
        'slider.buttonTextColor',
        'slider.isHaveButton',
        'image_url',
      ])
      .getMany();
  }
}
