import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

interface IFaq {
  blocks: [];
  time: number;
  version: string;
}

@Entity({ name: 'faq' })
export class FaqEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'json',
    name: 'faq',
    nullable: true,
  })
  faq: IFaq;
}
