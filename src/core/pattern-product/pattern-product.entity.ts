import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { FileUploadEntity } from '../file-upload/file-upload.entity';
import { SizesEntity } from '../sizes/sizes.entity';

@Entity({ name: 'pattern_product' })
export class PatternProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'json',
    name: 'categories',
  })
  categories!: [];

  @Column({
    type: 'integer',
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

  @OneToMany(
    () => FileUploadEntity,
    (file: FileUploadEntity) => file.patternProductId,
  )
  imageUrls: FileUploadEntity[];

  @OneToMany(() => SizesEntity, (sizes: SizesEntity) => sizes.patternProductId)
  sizes: SizesEntity[];

  @Column({
    type: 'bool',
    name: 'pinned',
    default: false,
  })
  pinned?: boolean;
}
