import { LikeEntity } from './../like/like.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { FileUploadEntity } from '../file-upload/file-upload.entity';
import { CategoryEntity } from '../category/category.entity';

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
    name: 'title_en',
  })
  titleEn!: string;

  @CreateDateColumn({
    name: 'created_date',
    readonly: true,
  })
  createdDate: Date;

  @Column({
    type: 'varchar',
    name: 'text_ru',
  })
  textRu!: string;

  @Column({
    type: 'varchar',
    name: 'text_en',
  })
  textEn!: string;

  @ManyToOne(() => FileUploadEntity, (file: FileUploadEntity) => file.post)
  @JoinColumn({
    name: 'image_url',
  })
  imageUrl: FileUploadEntity;

  @ManyToOne(() => CategoryEntity, (category: CategoryEntity) => category.post)
  @JoinColumn({
    name: 'category_id',
  })
  categoryId: CategoryEntity;

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
  })
  pinned?: boolean;

  @OneToMany(() => LikeEntity, (like: LikeEntity) => like.postId)
  like: LikeEntity[];
}
