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

  @Column({
    type: 'varchar',
    name: 'pattern_product_id',
    nullable: true,
  })
  patternProductId?: string;

  @Column({
    type: 'varchar',
    name: 'sewing_product_id',
    nullable: true,
  })
  sewingProductId?: string;

  @Column({
    type: 'varchar',
    name: 'purchase_product_name',
    nullable: true,
  })
  purchaseProductName: string;

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
