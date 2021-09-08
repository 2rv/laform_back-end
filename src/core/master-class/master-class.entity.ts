import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { FileUploadEntity } from '../file-upload/file-upload.entity';
import { PurchaseProductEntity } from '../purchase-product/purchase-product.entity';
import { ProgramsEntity } from '../programs/programs.entity';
import { CategoryEntity } from '../category/category.entity';
import { LikeEntity } from '../like/like.entity';
import { CommentEntity } from '../comment/comment.entity';
@Entity({ name: 'master_class' })
export class MasterClassEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(
    () => CategoryEntity,
    (category: CategoryEntity) => category.masterClassId,
  )
  categories: CategoryEntity[];

  @OneToMany(
    () => FileUploadEntity,
    (file: FileUploadEntity) => file.masterClassId,
  )
  images: FileUploadEntity[];

  @OneToMany(
    () => ProgramsEntity,
    (programNameRu: ProgramsEntity) => programNameRu.masterClassId,
  )
  programs: ProgramsEntity[];

  @OneToMany(
    () => PurchaseProductEntity,
    (purchaseProduct: PurchaseProductEntity) => purchaseProduct.masterClassId,
  )
  purchaseProduct: PurchaseProductEntity[];

  @OneToMany(() => LikeEntity, (like: LikeEntity) => like.masterClassId)
  like: LikeEntity[];

  @OneToMany(
    () => CommentEntity,
    (comment: CommentEntity) => comment.masterClassId,
  )
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
  titleEn: string;

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
  descriptionEn: string;

  @Column({
    type: 'int',
    name: 'discount',
    default: 0,
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
    default: 0,
  })
  type: number;

  @Column({
    type: 'json',
    name: 'master_class_article',
    nullable: true,
  })
  masterClassArticle: object;

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
