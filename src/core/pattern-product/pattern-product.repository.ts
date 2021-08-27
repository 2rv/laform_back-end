import { PatternProductEntity } from './pattern-product.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PatternProductEntity)
export class PatternProductRepository extends Repository<PatternProductEntity> {
  async findOneRu(id: string): Promise<PatternProductEntity> {
    return await this.createQueryBuilder('pattern_product')
      .where('pattern_product.id = :id', { id })
      .select([
        'pattern_product.id',
        'pattern_product.categories',
        'pattern_product.titleRu',
        'pattern_product.descriptionRu',
        'pattern_product.discount',
        'pattern_product.modifier',
        'pattern_product.type',
        'pattern_product.price',
        'pattern_product.complexity',
      ])
      .getOne();
  }

  async findAllRu(size: number, page: number): Promise<PatternProductEntity[]> {
    const take = size || 100;
    const skip = (page - 1) * size || 0;
    return await this.createQueryBuilder('pattern_product')
      .select([
        'pattern_product.id',
        'pattern_product.categories',
        'pattern_product.titleRu',
        'pattern_product.descriptionRu',
        'pattern_product.discount',
        'pattern_product.modifier',
        'pattern_product.type',
        'pattern_product.price',
        'pattern_product.complexity',
      ])
      .limit(take)
      .offset(skip)
      .getMany();
  }

  async findPinnedRu(): Promise<PatternProductEntity[]> {
    return await this.createQueryBuilder('pattern_product')
      .where('pattern_product.pinned = true')
      .select([
        'pattern_product.id',
        'pattern_product.titleRu',
        'pattern_product.descriptionRu',
        'pattern_product.price',
      ])
      .getMany();
  }

  async findOneEn(id: string): Promise<PatternProductEntity> {
    return await this.createQueryBuilder('pattern_product')
      .where('pattern_product.id = :id', { id })
      .select([
        'pattern_product.id',
        'pattern_product.titleEn',
        'pattern_product.descriptionEn',
        'pattern_product.price',
      ])
      .getOne();
  }

  async findAllEn(size: number, page: number): Promise<PatternProductEntity[]> {
    const take = size || 10;
    const skip = (page - 1) * size || 0;
    return await this.createQueryBuilder('pattern_product')
      .select([
        'pattern_product.id',
        'pattern_product.titleEn',
        'pattern_product.descriptionEn',
        'pattern_product.price',
      ])
      .limit(take)
      .offset(skip)
      .getMany();
  }

  async findPinnedEn(): Promise<PatternProductEntity[]> {
    return await this.createQueryBuilder('pattern_product')
      .where('pattern_product.pinned = true')
      .select([
        'pattern_product.id',
        'pattern_product.titleEn',
        'pattern_product.descriptionEn',
        'pattern_product.price',
      ])
      .getMany();
  }
}
