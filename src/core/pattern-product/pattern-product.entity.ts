import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';
import { CategoryEntity } from '../category/category.entity';
import { FileUploadEntity } from '../file-upload/file-upload.entity';
import { ProductOptionEntity } from '../product-option/product-option.entity';
import { LikeEntity } from '../like/like.entity';
import { CommentEntity } from '../comment/comment.entity';
import { PurchaseProductEntity } from '../purchase-product/purchase-product.entity';
import { RecommendationProductEntity } from '../recommendation-product/recommendation-product.entity';
import { RecommendationEntity } from '../recommendation/recommendation.entity';
import { generateVendorCode } from 'src/common/utils/vendor-coder';

@Entity({ name: 'pattern_product' })
export class PatternProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'int',
    name: 'type',
    readonly: true,
  })
  type!: number;

  @Column({
    type: 'int',
    name: 'option_type',
    default: 0,
  })
  optionType?: number;

  @Column({
    type: 'varchar',
    name: 'vendor_code',
    unique: true,
    nullable: true,
  })
  vendorCode: string;

  @CreateDateColumn({
    name: 'created_date',
    readonly: true,
  })
  createdDate: Date;

  static getVendorCode() {
    return generateVendorCode();
  }

  @ManyToMany(() => CategoryEntity)
  @JoinTable()
  categories: CategoryEntity[];

  @OneToMany(
    () => FileUploadEntity,
    (res: FileUploadEntity) => res.patternProductId,
  )
  images: FileUploadEntity[];

  @OneToMany(
    () => ProductOptionEntity,
    (res: ProductOptionEntity) => res.patternProductId,
    {
      cascade: true,
    },
  )
  options: ProductOptionEntity[];

  @OneToOne(
    () => RecommendationEntity,
    (res: RecommendationEntity) => res.patternProductId,
    { cascade: true },
  )
  recommendation: RecommendationEntity;

  @OneToMany(
    () => RecommendationProductEntity,
    (res: RecommendationProductEntity) => res.patternProductId,
  )
  recommendationProduct: RecommendationProductEntity[];

  @OneToMany(
    () => PurchaseProductEntity,
    (res: PurchaseProductEntity) => res.patternProductId,
  )
  purchaseProduct: PurchaseProductEntity[];

  @OneToMany(() => LikeEntity, (res: LikeEntity) => res.patternProductId)
  like: LikeEntity[];

  @OneToMany(() => CommentEntity, (res: CommentEntity) => res.patternProductId)
  comment: CommentEntity[];

  @OneToOne(() => FileUploadEntity, (res: FileUploadEntity) => res.filePdf)
  @JoinColumn({
    name: 'file_pdf',
  })
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
    type: 'json',
    name: ' material_ru',
    nullable: true,
  })
  materialRu: {
    blocks: [];
    time: number;
    version: string;
  };
  @Column({
    type: 'json',
    name: ' material_en',
    nullable: true,
  })
  materialEn: {
    blocks: [];
    time: number;
    version: string;
  };

  @Column({
    type: 'varchar',
    name: 'description_ru',
  })
  descriptionRu!: string;
  @Column({
    type: 'varchar',
    name: 'description_en',
    nullable: true,
  })
  descriptionEn!: string;

  @Column({
    type: 'varchar',
    name: 'modifier_ru',
    nullable: true,
  })
  modifierRu!: string;
  @Column({
    type: 'varchar',
    name: 'modifier_en',
    nullable: true,
  })
  modifierEn!: string;

  @Column({
    type: 'int',
    name: 'complexity',
    default: 0,
  })
  complexity!: number;

  @Column({
    type: 'int',
    name: 'discount',
    nullable: true,
  })
  discount?: number;

  @Column({
    type: 'numeric',
    name: 'price',
    nullable: true,
  })
  price?: number;

  @Column({
    type: 'int',
    name: 'count',
    nullable: true,
  })
  count!: number;

  @Column({
    type: 'bool',
    name: 'is_count',
    default: false,
  })
  isCount?: boolean;

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
}
