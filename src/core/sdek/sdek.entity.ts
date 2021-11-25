import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'sdek' })
export class SdekEntity {
  @PrimaryGeneratedColumn('uuid')
  nullable: false;
  id: string;

  @Column({
    type: 'varchar',
    name: 'adress',
    nullable: false,
    default: 'Пушкина 2',
  })
  adress!: string;

  @Column({
    type: 'varchar',
    name: 'city',
    nullable: false,
    default: 'Москва',
  })
  city!: string;

  @Column({
    type: 'integer',
    name: 'weight',
    nullable: false,
    default: 100,
  })
  weight?: number;

  @Column({
    type: 'integer',
    name: 'code',
    nullable: false,
    default: 270,
  })
  code?: number;
}
