import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { CategoryEntity } from '../category/category.entity';
import { FileUploadEntity } from '../file-upload/file-upload.entity';
import { SizesEntity } from '../sizes/sizes.entity';
import { LikeEntity } from '../like/like.entity';
import { CommentEntity } from '../comment/comment.entity';
import { PurchaseProductEntity } from '../purchase-product/purchase-product.entity';
import { RecommendationProductEntity } from '../recommendation-product/recommendation-product.entity';
import { RecommendationEntity } from '../recommendation/recommendation.entity';

@Entity({ name: 'pattern_product' })
export class PatternProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(
    () => CategoryEntity,
    (category: CategoryEntity) => category.patternProductId,
    { cascade: true },
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

  @OneToMany(
    () => RecommendationProductEntity,
    (purchaseProduct: RecommendationProductEntity) =>
      purchaseProduct.patternProductId,
  )
  recommendationProduct: RecommendationProductEntity[];

  @OneToOne(
    () => RecommendationEntity,
    (recommendation: RecommendationEntity) => recommendation.patternProductId,
    { cascade: true },
  )
  recommendation: RecommendationEntity;

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
    type: 'bool',
    name: 'deleted',
    default: false,
  })
  deleted?: boolean;

  @Column({
    type: 'int',
    name: 'like_count',
    nullable: true,
  })
  likeCount?: number;
}
