import { SewingProductEntity } from './../sewing-product/sewing-product.entity';
import { PatternProductEntity } from './../pattern-product/pattern-product.entity';
import { MasterClassEntity } from './../master-class/master-class.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { SliderEntity } from './../slider/slider.entity';
import { PostEntity } from './../post/post.entity';

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

  @ManyToOne(
    () => MasterClassEntity,
    (masterClass: MasterClassEntity) => masterClass.imageUrls,
  )
  @JoinColumn({
    name: 'master_class_id',
  })
  masterClassId: MasterClassEntity;

  @ManyToOne(
    () => SewingProductEntity,
    (sewingProduct: SewingProductEntity) => sewingProduct.imageUrls,
  )
  @JoinColumn({
    name: 'sewing_product_id',
  })
  sewingProductId: SewingProductEntity;
    () => PatternProductEntity,
    (patternProduct: PatternProductEntity) => patternProduct.imageUrls,
  )
  @JoinColumn({
    name: 'pattern_product_id',
  })
  patternProductId: PatternProductEntity;
}
