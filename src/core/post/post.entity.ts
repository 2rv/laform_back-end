import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { LikeEntity } from './../like/like.entity';
import { FileUploadEntity } from '../file-upload/file-upload.entity';
import { CategoryEntity } from '../category/category.entity';
import { CommentEntity } from './../comment/comment.entity';
import { RecommendationProductEntity } from '../recommendation-product/recommendation-product.entity';
import { RecommendationEntity } from '../recommendation/recommendation.entity';

@Entity({ name: 'post' })
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_date',
    readonly: true,
  })
  createdDate: Date;

  @OneToOne(() => FileUploadEntity, (res: FileUploadEntity) => res.postId)
  image: FileUploadEntity;

  @OneToMany(
    () => CategoryEntity,
    (category: CategoryEntity) => category.postId,
  )
  categories: CategoryEntity[];

  @OneToMany(() => LikeEntity, (like: LikeEntity) => like.postId)
  like: LikeEntity[];

  @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.postId)
  comment: CommentEntity[];

  @OneToMany(
    () => RecommendationProductEntity,
    (purchaseProduct: RecommendationProductEntity) => purchaseProduct.postId,
  )
  recommendationProduct: RecommendationProductEntity[];

  @OneToOne(
    () => RecommendationEntity,
    (recommendation: RecommendationEntity) => recommendation.postId,
    { cascade: true },
  )
  recommendation: RecommendationEntity;

  @Column({
    type: 'varchar',
    name: 'title_ru',
  })
  titleRu!: string;

  @Column({
    type: 'varchar',
    name: 'modifier',
    nullable: true,
  })
  modifier!: string;

  @Column({
    type: 'varchar',
    name: 'title_en',
    nullable: true,
  })
  titleEn!: string;

  @Column({
    type: 'json',
    name: 'article_ru',
  })
  articleText: {
    blocks: [];
    time: number;
    version: string;
  };

  @Column({
    type: 'int',
    name: 'like_count',
    nullable: true,
  })
  likeCount?: number;

  @Column({
    type: 'bool',
    name: 'pinned',
    nullable: true,
    default: false,
  })
  pinned?: boolean;

  @Column({
    type: 'int',
    name: 'type',
    default: 4,
  })
  type: number;
  @Column({
    type: 'bool',
    name: 'deleted',
    default: false,
    nullable: true,
  })
  deleted?: boolean;
}
