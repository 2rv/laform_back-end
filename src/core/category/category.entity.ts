import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PostEntity } from '../post/post.entity';
import { SliderEntity } from '../slider/slider.entity';

@Entity({ name: 'category' })
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @OneToMany(() => PostEntity, (post: PostEntity) => post.categoryId)
  post: PostEntity[];
  @OneToMany(() => SliderEntity, (slider: SliderEntity) => slider.categoryId)
  slider: SliderEntity[];
}
