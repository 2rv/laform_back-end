import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  OneToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { LikeEntity } from './../like/like.entity';
import { FileUploadEntity } from '../file-upload/file-upload.entity';
import { CategoryEntity } from '../category/category.entity';
import { CommentEntity } from './../comment/comment.entity';
import { RecommendationProductEntity } from '../recommendation-product/recommendation-product.entity';
import { RecommendationEntity } from '../recommendation/recommendation.entity';
import { generateVendorCode } from 'src/common/utils/vendor-coder';

@Entity({ name: 'post' })
export class PostEntity {
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
    type: 'int',
    name: 'type',
    default: 4,
    readonly: true,
  })
  type: number;

  @CreateDateColumn({
    name: 'created_date',
    readonly: true,
  })
  createdDate: Date;

  static getVendorCode() {
    return generateVendorCode();
  }

  @OneToOne(() => FileUploadEntity, (res: FileUploadEntity) => res.postId)
  image: FileUploadEntity;

  @ManyToMany(() => CategoryEntity)
  @JoinTable()
  categories: CategoryEntity[];

  @OneToOne(
    () => RecommendationEntity,
    (res: RecommendationEntity) => res.postId,
    { cascade: true },
  )
  recommendation: RecommendationEntity;

  @OneToMany(
    () => RecommendationProductEntity,
    (res: RecommendationProductEntity) => res.postId,
  )
  recommendationProduct: RecommendationProductEntity[];

  @OneToMany(() => LikeEntity, (res: LikeEntity) => res.postId)
  like: LikeEntity[];

  @OneToMany(() => CommentEntity, (res: CommentEntity) => res.postId)
  comment: CommentEntity[];

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
    type: 'json',
    name: 'article_ru',
  })
  articleRu: {
    blocks: [];
    time: number;
    version: string;
  };
  @Column({
    type: 'json',
    name: 'article_en',
    nullable: true,
  })
  articleEn: {
    blocks: [];
    time: number;
    version: string;
  };

  @Column({
    type: 'bool',
    name: 'pinned',
    nullable: true,
    default: false,
  })
  pinned?: boolean;

  @Column({
    type: 'bool',
    name: 'deleted',
    default: false,
    nullable: true,
  })
  deleted?: boolean;
}
