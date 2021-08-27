import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { MasterClassEntity } from '../master-class/master-class.entity';

@Entity({ name: 'programs' })
export class ProgramEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'name',
  })
  name!: string;

  @Column({
    type: 'integer',
    name: 'price',
  })
  price!: number;

  @ManyToOne(
    () => MasterClassEntity,
    (masterClass: MasterClassEntity) => masterClass.programs,
  )
  @JoinColumn({
    name: 'master_class_id',
  })
  masterClassId: MasterClassEntity;
}
