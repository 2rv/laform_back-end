import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { FileUploadEntity } from '../file-upload/file-upload.entity';

@Entity({ name: 'sewing_product' })
export class SewingProductEntity {
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

  @Column({
    type: 'varchar',
    name: 'description_ru',
  })
  descriptionRu!: string;

  @Column({
    type: 'varchar',
    name: 'description_en',
  })
  descriptionEn!: string;

  @Column({
    type: 'int',
    name: 'price',
  })
  price!: number;

  @OneToMany(
    () => FileUploadEntity,
    (file: FileUploadEntity) => file.sewingProductId,
  )
  imageUrls: FileUploadEntity[];
}
