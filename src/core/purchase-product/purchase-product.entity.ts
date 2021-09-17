import { MasterClassEntity } from './../master-class/master-class.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

import { PurchaseEntity } from '../purchase/purchase.entity';
import { PatternProductEntity } from '../pattern-product/pattern-product.entity';
import { SewingProductEntity } from '../sewing-product/sewing-product.entity';
import { ColorsEntity } from '../colors/colors.entity';
import { SizesEntity } from '../sizes/sizes.entity';
import { ProgramsEntity } from '../programs/programs.entity';

@Entity({ name: 'purchase_product' })
export class PurchaseProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_date',
    readonly: true,
  })
  createdDate: Date;

  @ManyToOne(
    () => PurchaseEntity,
    (purchase: PurchaseEntity) => purchase.purchaseProducts,
  )
  @JoinColumn({
    name: 'purchase_id',
  })
  purchase: PurchaseEntity;

  @ManyToOne(
    () => MasterClassEntity,
    (masterClass: MasterClassEntity) => masterClass.purchaseProduct,
  )
  @JoinColumn({
    name: 'master_class_id',
  })
  masterClassId: MasterClassEntity;

  @ManyToOne(
    () => PatternProductEntity,
    (patternProduct: PatternProductEntity) => patternProduct.purchaseProduct,
  )
  @JoinColumn({
    name: 'pattern_product_id',
  })
  patternProductId: PatternProductEntity;

  @ManyToOne(
    () => SewingProductEntity,
    (sewingProduct: SewingProductEntity) => sewingProduct.purchaseProduct,
  )
  @JoinColumn({
    name: 'sewing_product_id',
  })
  sewingProductId: SewingProductEntity;

  @Column({
    type: 'int',
    name: 'type',
  })
  type: number;

  @ManyToOne(() => ColorsEntity, (res: ColorsEntity) => res.purchasedProductId)
  @JoinColumn({
    name: 'color',
  })
  color: ColorsEntity;

  @ManyToOne(() => SizesEntity, (res: SizesEntity) => res.purchasedProductId)
  @JoinColumn({
    name: 'size',
  })
  size: SizesEntity;

  @ManyToOne(
    () => ProgramsEntity,
    (res: ProgramsEntity) => res.purchasedProductId,
  )
  @JoinColumn({
    name: 'program',
  })
  program: ProgramsEntity;

  @Column({
    type: 'int',
    name: 'total_count',
    nullable: true,
    default: 1,
  })
  totalCount: number;

  @Column({
    type: 'int',
    name: 'total_discount',
    nullable: true,
    default: 0,
  })
  totalDiscount: number;

  @Column({
    type: 'numeric',
    name: 'total_price',
  })
  totalPrice: number;
}
