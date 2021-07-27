import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SliderEntity } from './../slider/slider.entity';
import { PostEntity } from './../post/post.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';


@Entity({ name: 'files' })
export class FileUploadEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'file_url',
  })
  fileUrl!: string;

  @OneToMany(() => PostEntity, (post: PostEntity) => post.imageUrl)
  post: PostEntity[];
  @OneToMany(() => SliderEntity, (slider: SliderEntity) => slider.imageUrl)
  slider: SliderEntity[];
}
