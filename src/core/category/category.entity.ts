import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'category' })
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'category_name_ru',
    unique: true,
  })
  categoryNameRu!: string;

  @Column({
    type: 'varchar',
    name: 'category_name_en',
    nullable: true,
    unique: true,
  })
  categoryNameEn!: string;

  @Column({
    type: 'varchar',
    name: 'type',
  })
  type!: string;
}
