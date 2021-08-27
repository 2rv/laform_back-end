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
import { ProgramEntity } from '../program/program-entity';

@Entity({ name: 'master_class' })
export class MasterClassEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'json',
    name: 'categories',
  })
  categories!: [];

  @Column({
    type: 'varchar',
    name: 'descriptionRu',
  })
  descriptionRu!: string;

  @Column({
    type: 'varchar',
    name: 'descriptionEn',
    nullable: true,
  })
  descriptionEn: string;

  @Column({
    type: 'integer',
    name: 'discount',
  })
  discount!: number;

  @OneToMany(
    () => FileUploadEntity,
    (file: FileUploadEntity) => file.masterClassId,
  )
  imageUrls: FileUploadEntity[];

  @OneToMany(
    () => ProgramEntity,
    (program: ProgramEntity) => program.masterClassId,
  )
  programs: ProgramEntity[];

  @Column({
    type: 'varchar',
    name: 'modifier',
  })
  modifier!: string;

  @Column({
    type: 'varchar',
    name: 'titleRu',
  })
  titleRu!: string;

  @Column({
    type: 'varchar',
    name: 'titleEn',
    nullable: true,
  })
  titleEn: string;

  @Column({
    type: 'json',
    name: 'type',
  })
  type!: object;

  @Column({
    type: 'bool',
    name: 'pinned',
    default: false,
  })
  pinned?: boolean;

  @OneToMany(
    () => PurchaseProductEntity,
    (purchaseProduct: PurchaseProductEntity) => purchaseProduct.masterClassId,
  )
  purchaseProduct: PurchaseProductEntity[];
}
