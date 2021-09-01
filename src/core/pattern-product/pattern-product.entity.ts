import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CategoryEntity } from '../category/category.entity';
import { FileUploadEntity } from '../file-upload/file-upload.entity';
import { SizesEntity } from '../sizes/sizes.entity';
import { CommentEntity } from '../comment/comment.entity';

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

  @OneToMany(
    () => CommentEntity,
    (comment: CommentEntity) => comment.patternProductId,
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
  titleEn!: string;

  @Column({
    type: 'varchar',
    name: 'description_ru',
  })
  descriptionRu!: string;

  @Column({
    type: 'varchar',
    name: ' material_ru',
    nullable: true,
  })
  materialRu!: string;

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
  })
  modifier!: string;

  @Column({
    type: 'json',
    name: 'type',
  })
  type!: object;

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
}
