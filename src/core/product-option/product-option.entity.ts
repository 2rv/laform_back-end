import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { PatternProductEntity } from '../pattern-product/pattern-product.entity';
import { SewingProductEntity } from '../sewing-product/sewing-product.entity';
import { PurchaseProductEntity } from '../purchase-product/purchase-product.entity';
import { FileUploadEntity } from '../file-upload/file-upload.entity';

@Entity({ name: 'product_options' })
export class ProductOptionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'vendor_code',
    unique: true,
    readonly: true,
  })
  vendorCode: string;

  @Column({
    type: 'varchar',
    name: 'color_ru',
    nullable: true,
  })
  colorRu!: string;
  @Column({
    type: 'varchar',
    name: 'color_en',
    nullable: true,
  })
  colorEn!: string;

  @Column({
    type: 'varchar',
    name: 'size',
    nullable: true,
  })
  size!: string;

  @Column({
    type: 'numeric',
    name: 'price',
    default: 0,
  })
  price!: number;

  @Column({
    type: 'int',
    name: 'discount',
    default: 0,
  })
  discount!: number;

  @OneToOne(() => FileUploadEntity, (res: FileUploadEntity) => res.filePdf)
  @JoinColumn({
    name: 'file_pdf',
  })
  filePdf: FileUploadEntity;

  @ManyToOne(
    () => PatternProductEntity,
    (res: PatternProductEntity) => res.options,
  )
  @JoinColumn({
    name: 'pattern_product_id',
  })
  patternProductId: PatternProductEntity;

  @ManyToOne(
    () => SewingProductEntity,
    (res: SewingProductEntity) => res.options,
  )
  @JoinColumn({
    name: 'sewing_product_id',
  })
  sewingProductId: SewingProductEntity;

  @OneToMany(
    () => PurchaseProductEntity,
    (res: PurchaseProductEntity) => res.options,
  )
  @JoinColumn({
    name: 'purchased_product_id',
  })
  purchasedProductId: PurchaseProductEntity[];
}
