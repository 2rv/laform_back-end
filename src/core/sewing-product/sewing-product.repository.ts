import { SewingProductEntity } from './sewing-product.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(SewingProductEntity)
export class SewingProductRepository extends Repository<SewingProductEntity> {
  async findOneRu(id: string): Promise<SewingProductEntity> {
    return await this.createQueryBuilder('sewing_product')
      .where('sewing_product.id = :id', { id })
      .select([
        'sewing_product.id',
        'sewing_product.titleRu',
        'sewing_product.descriptionRu',
        'sewing_product.price',
      ])
      .getOne();
  }

  async findAllRu(size: number, page: number): Promise<SewingProductEntity[]> {
    const take = size || 100;
    const skip = (page - 1) * size || 0;
    return await this.createQueryBuilder('sewing_product')
      .select([
        'sewing_product.id',
        'sewing_product.titleRu',
        'sewing_product.descriptionRu',
        'sewing_product.discount',
        'sewing_product.modifier',
        'sewing_product.type',
        'sewing_product.count',
      ])
      .limit(take)
      .offset(skip)
      .getMany();
  }

  async findPinnedRu(): Promise<SewingProductEntity[]> {
    return await this.createQueryBuilder('sewing_product')
      .where('sewing_product.pinned = true')
      .select([
        'sewing_product.id',
        'sewing_product.titleRu',
        'sewing_product.descriptionRu',
      ])
      .getMany();
  }

  async findOneEn(id: string): Promise<SewingProductEntity> {
    return await this.createQueryBuilder('sewing_product')
      .where('sewing_product.id = :id', { id })
      .select([
        'sewing_product.id',
        'sewing_product.titleEn',
        'sewing_product.descriptionEn',
      ])
      .getOne();
  }

  async findAllEn(size: number, page: number): Promise<SewingProductEntity[]> {
    const take = size || 10;
    const skip = (page - 1) * size || 0;
    return await this.createQueryBuilder('sewing_product')
      .select([
        'sewing_product.id',
        'sewing_product.titleEn',
        'sewing_product.descriptionEn',
      ])
      .limit(take)
      .offset(skip)
      .getMany();
  }

  async findPinnedEn(): Promise<SewingProductEntity[]> {
    return await this.createQueryBuilder('sewing_product')
      .where('sewing_product.pinned = true')
      .select([
        'sewing_product.id',
        'sewing_product.titleEn',
        'sewing_product.descriptionEn',
      ])
      .getMany();
  }
}
