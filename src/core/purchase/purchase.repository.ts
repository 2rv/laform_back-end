import { PurchaseEntity } from './purchase.entity';
import { EntityRepository, Like, Repository } from 'typeorm';

@EntityRepository(PurchaseEntity)
export class PurchaseRepository extends Repository<PurchaseEntity> {
  async getAll(
    size: number,
    page: number,
    orderNumber: string,
  ): Promise<{ purchases: PurchaseEntity[]; total: number }> {
    const take = size || 5;
    const skip = (page - 1) * size || 0;

    const [purchases, total] = await this.findAndCount({
      where: {
        orderNumber: Like(`%${orderNumber}%`),
      },
      relations: [
        'purchaseProducts',
        'purchaseProducts.masterClassId',
        'purchaseProducts.masterClassId.images',
        'purchaseProducts.sewingProductId',
        'purchaseProducts.sewingProductId.images',
        'purchaseProducts.patternProductId',
        'purchaseProducts.patternProductId.images',
      ],
      take,
      skip,
    });

    return {
      purchases,
      total: Math.ceil(total / size),
    };
  }

  async getAllForUser(
    size: number,
    page: number,
    userId,
  ): Promise<{ purchases: PurchaseEntity[]; total: number }> {
    const take = size || 10;
    const skip = (page - 1) * size || 0;

//     return await this.createQueryBuilder('purchase')
//       .leftJoinAndSelect('purchase.purchaseProducts', 'purchaseProducts')
//       .leftJoinAndSelect('purchaseProducts.masterClassId', 'masterClassId')
//       .leftJoinAndSelect(
//         'purchaseProducts.patternProductId',
//         'patternProductId',
//       )
//       .leftJoinAndSelect('purchaseProducts.sewingProductId', 'sewingProductId')
//       .where('purchase.userId = :userId', { userId })
//       .limit(take)
//       .offset(skip)
//       .getMany();

    const [purchases, total] = await this.findAndCount({
      where: { userId },
      relations: [
        'purchaseProducts',
        'purchaseProducts.masterClassId',
        'purchaseProducts.masterClassId.images',
        'purchaseProducts.sewingProductId',
        'purchaseProducts.sewingProductId.images',
        'purchaseProducts.patternProductId',
        'purchaseProducts.patternProductId.images',
      ],
      take,
      skip,
    });

    return {
      purchases,
      total: Math.ceil(total / size),
    };
  }

  async getOneForUser(id: string, userId): Promise<PurchaseEntity> {
    return await this.createQueryBuilder('purchase')
      .leftJoinAndSelect('purchase.purchaseProducts', 'purchaseProducts')
      .leftJoinAndSelect('purchaseProducts.masterClassId', 'masterClassId')
      .leftJoinAndSelect(
        'purchaseProducts.patternProductId',
        'patternProductId',
      )
      .leftJoinAndSelect('purchaseProducts.sewingProductId', 'sewingProductId')
      .where('purchase.id = :id', { id })
      .andWhere('purchase.userId = :userId', { userId })
      .getOne();
  }

  async getOne(id: string): Promise<PurchaseEntity> {
    return await this.createQueryBuilder('purchase')
      .leftJoinAndSelect('purchase.purchaseProducts', 'purchase_products')
      .leftJoinAndSelect('purchase_products.masterClassId', 'ppms')
      .leftJoinAndSelect('ppms.images', 'ppmsi')
      .leftJoinAndSelect('purchase_products.sewingProductId', 'ppsp')
      .leftJoinAndSelect('ppsp.images', 'ppspi')
      .leftJoinAndSelect('purchase_products.patternProductId', 'pppp')
      .leftJoinAndSelect('pppp.images', 'ppppi')

      .where('purchase.id = :id', { id })
      .getOne();
  }
}
