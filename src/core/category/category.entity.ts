import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
