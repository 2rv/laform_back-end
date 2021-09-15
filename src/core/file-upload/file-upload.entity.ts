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
  OneToOne,
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

  @OneToMany(() => SliderEntity, (slider: SliderEntity) => slider.imageUrl)
  slider: SliderEntity[];

  @OneToOne(
    () => PatternProductEntity,
    (res: PatternProductEntity) => res.filePdf,
  )
  @JoinColumn({
    name: 'file_pdf_pattern_product_id',
  })
  filePdfPatternProductId: PatternProductEntity;

  @OneToOne(() => PostEntity, (res: PostEntity) => res.image)
  @JoinColumn({
    name: 'post_id',
  })
  postId: PostEntity;

  @ManyToOne(
    () => MasterClassEntity,
    (masterClass: MasterClassEntity) => masterClass.images,
  )
  @JoinColumn({
    name: 'master_class_id',
  })
  masterClassId: MasterClassEntity;

  @ManyToOne(
    () => SewingProductEntity,
    (sewingProduct: SewingProductEntity) => sewingProduct.images,
  )
  @JoinColumn({
    name: 'sewing_product_id',
  })
  sewingProductId: SewingProductEntity;

  @ManyToOne(
    () => PatternProductEntity,
    (patternProduct: PatternProductEntity) => patternProduct.images,
  )
  @JoinColumn({
    name: 'pattern_product_id',
  })
  patternProductId: PatternProductEntity;
}
