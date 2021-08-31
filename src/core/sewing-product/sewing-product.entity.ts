import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CategoryEntity } from '../category/category.entity';
import { ColorsEntity } from '../colors/colors.entity';
import { FileUploadEntity } from '../file-upload/file-upload.entity';
import { SizesEntity } from '../sizes/sizes.entity';
import { LikeEntity } from '../like/like.entity';

@Entity({ name: 'sewing_product' })
export class SewingProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(
    () => CategoryEntity,
    (category: CategoryEntity) => category.sewingProductId,
  )
  categories: CategoryEntity[];

  @OneToMany(() => SizesEntity, (sizes: SizesEntity) => sizes.sewingProductId)
  sizes: SizesEntity[];

  @OneToMany(
    () => ColorsEntity,
    (colors: ColorsEntity) => colors.sewingProductId,
  )
  colors: ColorsEntity[];

  @OneToMany(
    () => FileUploadEntity,
    (file: FileUploadEntity) => file.sewingProductId,
  )
  images: FileUploadEntity[];

  @OneToMany(() => LikeEntity, (like: LikeEntity) => like.sewingProductId)
  like: LikeEntity[];

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
    name: 'description_en',
    nullable: true,
  })
  descriptionEn!: string;

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
    name: 'discount',
  })
  discount!: number;

  @Column({
    type: 'int',
    name: 'count',
  })
  count!: number;

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
