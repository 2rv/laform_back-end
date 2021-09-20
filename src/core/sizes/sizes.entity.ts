import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { PatternProductEntity } from '../pattern-product/pattern-product.entity';
import { SewingProductEntity } from '../sewing-product/sewing-product.entity';
import { generateVendorCode } from '../../common/utils/vendor-coder';
import { PurchaseProductEntity } from '../purchase-product/purchase-product.entity';

@Entity({ name: 'sizes' })
export class SizesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'vendor_code',
    unique: true,
    nullable: true,
  })
  vendorCode: string;

  static getVendorCode() {
    return generateVendorCode();
  }

  @Column({
    type: 'int',
    name: 'count',
    default: 0,
    nullable: true,
  })
  count: number;

  @Column({
    type: 'varchar',
    name: 'size',
  })
  size!: string;

  @Column({
    type: 'int',
    name: 'price',
  })
  price!: number;

  @ManyToOne(
    () => PatternProductEntity,
    (pattern: PatternProductEntity) => pattern.sizes,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({
    name: 'patternProductId',
  })
  patternProductId: PatternProductEntity;

  @ManyToOne(
    () => SewingProductEntity,
    (pattern: SewingProductEntity) => pattern.sizes,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({
    name: 'sewingProductId',
  })
  sewingProductId: SewingProductEntity;

  @OneToMany(
    () => PurchaseProductEntity,
    (res: PurchaseProductEntity) => res.size,
  )
  @JoinColumn({
    name: 'purchased_product_id',
  })
  purchasedProductId: PurchaseProductEntity[];
}
