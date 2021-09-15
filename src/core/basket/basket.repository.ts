import { BasketEntity } from './basket.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(BasketEntity)
export class BasketRepository extends Repository<BasketEntity> {
  async getOne(userId: number): Promise<BasketEntity> {
    return await this.createQueryBuilder('basket')
      .leftJoinAndSelect('basket.purchaseProducts', 'purchaseProducts')
      .leftJoinAndSelect('purchaseProducts.masterClassId', 'masterClassId')
      .leftJoinAndSelect(
        'purchaseProducts.patternProductId',
        'patternProductId',
      )
      .leftJoinAndSelect('purchaseProducts.sewingProductId', 'sewingProductId')
      .leftJoinAndSelect('sewingProductId.categories', 'categories')
      .leftJoinAndSelect('sewingProductId.sizes', 'sizes')
      .leftJoinAndSelect('sewingProductId.colors', 'colors')
      .leftJoinAndSelect('sewingProductId.images', 'images')
      .where('basket.userId = :userId', { userId })
      .getOne();
  }

  async getAllForUser(
    size: number,
    page: number,
    userId,
  ): Promise<BasketEntity[]> {
    const take = size || 10;
    const skip = (page - 1) * size || 0;

    return await this.createQueryBuilder('purchase')
      .leftJoinAndSelect('purchase.purchaseProducts', 'purchase_products')
      .where('purchase.userId = :userId', { userId })
      .limit(take)
      .offset(skip)
      .getMany();
  }

  async getOneForUser(id: string, userId): Promise<BasketEntity> {
    return await this.createQueryBuilder('purchase')
      .leftJoinAndSelect('purchase.purchaseProducts', 'purchase_products')
      .where('purchase.id = :id', { id })
      .andWhere('purchase.userId = :userId', { userId })
      .getOne();
  }
}
