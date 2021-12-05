import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'faq-size' })
export class FaqSizeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'json',
    name: 'data',
    nullable: true,
  })
  data: {
    blocks: [];
    time: number;
    version: string;
  };
}
