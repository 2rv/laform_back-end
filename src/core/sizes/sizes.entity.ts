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
import { generateVendorCode } from '../../common/utils/vendor-coder';
import { PurchaseProductEntity } from '../purchase-product/purchase-product.entity';
import { FileUploadEntity } from '../file-upload/file-upload.entity';

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

  @OneToOne(
    () => FileUploadEntity,
    (res: FileUploadEntity) => res.filePdfPatternProductId,
  )
  @JoinColumn({
    name: 'file_pdf_pattern_product_id',
  })
  filePdf: FileUploadEntity;
}
