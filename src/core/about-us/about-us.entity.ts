import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

interface IAbout {
  blocks: [];
  time: number;
  version: string;
}

@Entity({ name: 'about_us' })
export class AboutUsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'json',
    name: 'about',
    nullable: true,
  })
  about: IAbout;
}
