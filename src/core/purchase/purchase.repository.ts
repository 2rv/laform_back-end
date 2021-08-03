import { PurchaseEntity } from './purchase.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PurchaseEntity)
export class PurchaseRepository extends Repository<PurchaseEntity> {
  async getAll(size: number, page: number): Promise<PurchaseEntity[]> {
    const take = size || 10;
    const skip = (page - 1) * size || 0;

    return await this.createQueryBuilder('purchase')
      .leftJoinAndSelect('purchase.purchaseProducts', 'purchaseProducts')
      .limit(take)
      .offset(skip)
      .getMany();
  }

  async getAllForUser(
    size: number,
    page: number,
    userId,
  ): Promise<PurchaseEntity[]> {
    const take = size || 10;
    const skip = (page - 1) * size || 0;

    return await this.createQueryBuilder('purchase')
      .leftJoinAndSelect('purchase.purchaseProducts', 'purchase_products')
      .where('purchase.userId = :userId', { userId })
      .limit(take)
      .offset(skip)
      .getMany();
  }

  async getOneForUser(id: string, userId): Promise<PurchaseEntity> {
    return await this.createQueryBuilder('purchase')
      .leftJoinAndSelect('purchase.purchaseProducts', 'purchase_products')
      .where('purchase.id = :id', { id })
      .andWhere('purchase.userId = :userId', { userId })
      .getOne();
  }

  async getOne(id: string): Promise<PurchaseEntity> {
    return await this.createQueryBuilder('purchase')
      .leftJoinAndSelect('purchase.purchaseProducts', 'purchase_products')
      .where('purchase.id = :id', { id })
      .getOne();
  }
}
