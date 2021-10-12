import { DeliveryPriceEntity } from './delivery-price.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(DeliveryPriceEntity)
export class DeliveryPriceRepository extends Repository<DeliveryPriceEntity> {}
