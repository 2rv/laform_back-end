import { EntityRepository, Repository } from 'typeorm';
import { PurchaseProductEntity } from './purchase-product.entity';

@EntityRepository(PurchaseProductEntity)
export class PurchaseProductRepository extends Repository<PurchaseProductEntity> {}
