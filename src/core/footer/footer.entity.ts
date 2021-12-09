import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'footer' })
export class FooterEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'phone',
  })
  phone!: string;
}
