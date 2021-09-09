import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { CategoryEntity } from '../category/category.entity';
import { FileUploadEntity } from '../file-upload/file-upload.entity';
import { SizesEntity } from '../sizes/sizes.entity';
import { LikeEntity } from '../like/like.entity';
import { CommentEntity } from '../comment/comment.entity';
import { PurchaseProductEntity } from '../purchase-product/purchase-product.entity';

@Entity({ name: 'pattern_product' })
export class PatternProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(
    () => CategoryEntity,
    (category: CategoryEntity) => category.patternProductId,
  )
  categories: CategoryEntity[];

  @OneToMany(
    () => FileUploadEntity,
    (file: FileUploadEntity) => file.patternProductId,
  )
  images: FileUploadEntity[];

  @OneToMany(() => SizesEntity, (sizes: SizesEntity) => sizes.patternProductId)
  sizes: SizesEntity[];

  @OneToMany(() => LikeEntity, (like: LikeEntity) => like.patternProductId)
  like: LikeEntity[];

  @OneToMany(
    () => CommentEntity,
    (comment: CommentEntity) => comment.patternProductId,
  )
  comment: CommentEntity[];

  @OneToMany(
    () => PurchaseProductEntity,
    (purchaseProduct: PurchaseProductEntity) =>
      purchaseProduct.patternProductId,
  )
  purchaseProduct: PurchaseProductEntity[];

  @OneToOne(
    () => FileUploadEntity,
    (res: FileUploadEntity) => res.filePdfPatternProductId,
  )
  filePdf: FileUploadEntity;

  @Column({
    type: 'varchar',
    name: 'title_ru',
  })
  titleRu!: string;

  @Column({
    type: 'varchar',
    name: 'title_en',
    nullable: true,
  })
  titleEn!: string;

  @Column({
    type: 'varchar',
    name: 'description_ru',
  })
  descriptionRu!: string;

  @Column({
    type: 'json',
    name: ' material_ru',
    nullable: true,
  })
  materialRu: object;

  @Column({
    type: 'varchar',
    name: 'description_en',
    nullable: true,
  })
  descriptionEn!: string;

  @Column({
    type: 'int',
    name: 'discount',
  })
  discount!: number;

  @Column({
    type: 'varchar',
    name: 'modifier',
    nullable: true,
  })
  modifier!: string;

  @Column({
    type: 'int',
    name: 'type',
  })
  type!: number;

  @Column({
    type: 'int',
    name: 'price',
    nullable: true,
  })
  price!: number;

  @Column({
    type: 'int',
    name: 'complexity',
  })
  complexity!: number;

  @Column({
    type: 'bool',
    name: 'pinned',
    default: false,
  })
  pinned?: boolean;

  @Column({
    type: 'int',
    name: 'like_count',
    nullable: true,
  })
  likeCount?: number;
}
