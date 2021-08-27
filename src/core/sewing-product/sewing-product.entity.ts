import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ColorsEntity } from '../colors/colors.entity';
import { FileUploadEntity } from '../file-upload/file-upload.entity';
import { SizesEntity } from '../sizes/sizes.entity';

@Entity({ name: 'sewing_product' })
export class SewingProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'json',
    name: 'categories',
  })
  categories!: [];

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

  @OneToMany(() => SizesEntity, (sizes: SizesEntity) => sizes.sewingProductId)
  sizes: SizesEntity[];

  @OneToMany(
    () => ColorsEntity,
    (colors: ColorsEntity) => colors.sewingProductId,
  )
  colors: ColorsEntity[];

  @Column({
    type: 'bool',
    name: 'pinned',
    default: false,
  })
  pinned?: boolean;

  @OneToMany(
    () => FileUploadEntity,
    (file: FileUploadEntity) => file.sewingProductId,
  )
  imageUrls: FileUploadEntity[];
}
