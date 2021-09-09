import { MasterClassEntity } from './../master-class/master-class.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { CategoryEntity } from '../category/category.entity';
import { PurchaseEntity } from '../purchase/purchase.entity';
import { BasketEntity } from '../basket/basket.entity';
import { PatternProductEntity } from '../pattern-product/pattern-product.entity';
import { SewingProductEntity } from '../sewing-product/sewing-product.entity';

@Entity({ name: 'purchase_product' })
export class PurchaseProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @ManyToOne(
    () => BasketEntity,
    (basket: BasketEntity) => basket.purchaseProducts,
  )
  @JoinColumn({
    name: 'basket_id',
  })
  basketId: BasketEntity;

  @Column({
    type: 'varchar',
    name: 'quantity',
    nullable: true,
  })
  quantity?: string;

  @Column({
    type: 'varchar',
    name: 'total',
    nullable: true,
  })
  total: string;

  @Column({
    type: 'varchar',
    name: 'color',
    nullable: true,
  })
  color?: string;

  @Column({
    type: 'varchar',
    name: 'size',
    nullable: true,
  })
  size?: string;

  @Column({
    type: 'varchar',
    name: 'format',
    nullable: true,
  })
  format?: string;

  @Column({
    type: 'varchar',
    name: 'type',
    nullable: true,
  })
  type?: string;

  @Column({
    type: 'varchar',
    name: 'program',
    nullable: true,
  })
  program?: string;

  /* @ManyToOne(() => CategoryEntity, (category: CategoryEntity) => category.post)
  @JoinColumn({
    name: 'category_id',
  })
  categoryId?: CategoryEntity; */

  @CreateDateColumn({
    name: 'created_date',
    readonly: true,
  })
  createdDate: Date;
}
