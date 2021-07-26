import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { MasterClassEntity } from '../master-class/master-class.entity';

@Entity({ name: 'files' })
export class FileUploadEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'file_url',
  })
  fileUrl!: string;

  @ManyToOne(
    () => MasterClassEntity,
    (masterClass: MasterClassEntity) => masterClass.imageUrls,
  )
  masterClass: MasterClassEntity;
}
