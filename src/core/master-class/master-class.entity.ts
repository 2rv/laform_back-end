import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { FileUploadEntity } from '../file-upload/file-upload.entity';
import { PurchaseProductEntity } from '../purchase-product/purchase-product.entity';

@Entity({ name: 'master_class' })
export class MasterClassEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'title_ru',
  })
  titleRu!: string;

  @Column({
    type: 'varchar',
    name: 'title_en',
  })
  titleEn!: string;

  @Column({
    type: 'varchar',
    name: 'description_ru',
  })
  descriptionRu!: string;

  @Column({
    type: 'varchar',
    name: 'description_en',
  })
  descriptionEn!: string;

  @Column({
    type: 'int',
    name: 'price',
  })
  price!: number;

  @Column({
    type: 'bool',
    name: 'pinned',
    default: false,
  })
  pinned?: boolean;

  @OneToMany(
    () => FileUploadEntity,
    (file: FileUploadEntity) => file.masterClassId,
  )
  imageUrls: FileUploadEntity[];

  @OneToMany(
    () => PurchaseProductEntity,
    (purchaseProduct: PurchaseProductEntity) => purchaseProduct.masterClassId,
  )
  purchaseProduct: PurchaseProductEntity[];
}
