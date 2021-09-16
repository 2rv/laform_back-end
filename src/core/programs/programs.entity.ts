import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  Generated,
} from 'typeorm';
import { MasterClassEntity } from '../master-class/master-class.entity';
import { generateVendorCode } from '../../common/utils/vendor-coder';

@Entity({ name: 'programs' })
export class ProgramsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'vendor_code',
    unique: true,
  })
  vendorCode: string;

  static getVendorCode() {
    return generateVendorCode();
  }

  @ManyToOne(
    () => MasterClassEntity,
    (masterClass: MasterClassEntity) => masterClass.programs,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({
    name: 'master_class_id',
  })
  masterClassId: MasterClassEntity;

  @Column({
    type: 'varchar',
    name: 'program_name_ru',
  })
  programNameRu: string;

  @Column({
    type: 'varchar',
    name: 'program_name_en',
    nullable: true,
  })
  programNameEn: string;

  @Column({
    type: 'json',
    name: 'article_text',
    nullable: true,
  })
  articleText: {
    blocks: [];
    time: number;
    version: string;
  };

  @Column({
    type: 'int',
    name: 'price',
  })
  price: number;
}
