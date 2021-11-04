import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

interface ITermsOfUse {
  blocks: [];
  time: number;
  version: string;
}

@Entity({ name: 'terms_of_use' })
export class TermsOfUseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'json',
    name: 'terms_of_use',
    nullable: true,
  })
  termsOfUse: ITermsOfUse;
}
