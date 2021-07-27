import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { FileUploadEntity } from '../file-upload/file-upload.entity';
import { CategoryEntity } from '../category/category.entity';

@Entity({ name: 'slider' })
export class SliderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'heading_text_ru',
  })
  headingTextRu!: string;

  @Column({
    type: 'varchar',
    name: 'heading_text_en',
  })
  headingTextEn!: string;

  @Column({
    type: 'varchar',
    name: 'button_text_ru',
  })
  buttonTextRu!: string;

  @Column({
    type: 'varchar',
    name: 'button_text_en',
    nullable: true,
  })
  buttonTextEn!: string;

  @Column({
    type: 'varchar',
    name: 'button_url',
    nullable: true,
  })
  buttonUrl?: string;

  @ManyToOne(() => FileUploadEntity, (file: FileUploadEntity) => file.slider)
  @JoinColumn({
    name: 'image_url',
  })
  imageUrl: FileUploadEntity;

  @ManyToOne(
    () => CategoryEntity,
    (category: CategoryEntity) => category.slider,
  )
  @JoinColumn({
    name: 'category_id',
  })
  categoryId: CategoryEntity;
}
