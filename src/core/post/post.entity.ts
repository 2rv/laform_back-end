import { LikeEntity } from './../like/like.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { FileUploadEntity } from '../file-upload/file-upload.entity';
import { CategoryEntity } from '../category/category.entity';
import { CommentEntity } from './../comment/comment.entity';

@Entity({ name: 'post' })
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @CreateDateColumn({
    name: 'created_date',
    readonly: true,
  })
  createdDate: Date;

  @Column({
    type: 'json',
    name: 'article_ru',
  })
  postArticle: object;

  @OneToOne(() => FileUploadEntity, (res: FileUploadEntity) => res.postId)
  image: FileUploadEntity;

  @OneToMany(
    () => CategoryEntity,
    (category: CategoryEntity) => category.postId,
  )
  categories: CategoryEntity[];

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

  @OneToMany(() => LikeEntity, (like: LikeEntity) => like.postId)
  like: LikeEntity[];

  @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.postId)
  comment: CommentEntity[];

  @Column({
    type: 'int',
    name: 'type',
    default: 4,
  })
  type: number;
}
