import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'category' })
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'category_name_ru',
  })
  categoryNameRu!: string;

  @Column({
    type: 'varchar',
    name: 'category_name_en',
    nullable: true,
  })
  categoryNameEn!: string;

  @Column({
    type: 'varchar',
    name: 'type',
  })
  type!: string;
}
