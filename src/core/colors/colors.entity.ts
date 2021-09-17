import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { PurchaseProductEntity } from '../purchase-product/purchase-product.entity';
import { SewingProductEntity } from '../sewing-product/sewing-product.entity';

@Entity({ name: 'colors' })
export class ColorsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'color',
  })
  color!: string;

  @ManyToOne(
    () => SewingProductEntity,
    (sewingProducts: SewingProductEntity) => sewingProducts.colors,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({
    name: 'sewingProductId',
  })
  sewingProductId: SewingProductEntity;

  @OneToMany(
    () => PurchaseProductEntity,
    (res: PurchaseProductEntity) => res.color,
  )
  @JoinColumn({
    name: 'purchased_product_id',
  })
  purchasedProductId: PurchaseProductEntity[];
}
