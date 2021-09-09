import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { MasterClassEntity } from '../master-class/master-class.entity';
import { PatternProductEntity } from '../pattern-product/pattern-product.entity';
import { PostEntity } from '../post/post.entity';
import { SewingProductEntity } from '../sewing-product/sewing-product.entity';
import { SliderEntity } from '../slider/slider.entity';

@Entity({ name: 'category' })
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'text_ru',
  })
  textRu!: string;

  @Column({
    type: 'varchar',
    name: 'text_en',
    nullable: true,
  })
  textEn!: string;

  @ManyToOne(
    () => MasterClassEntity,
    (masterClass: MasterClassEntity) => masterClass.categories,
  )
  @JoinColumn({
    name: 'master_class_id',
  })
  masterClassId: MasterClassEntity;

  @ManyToOne(() => PostEntity, (res: PostEntity) => res.categories)
  @JoinColumn({
    name: 'postId',
  })
  postId: PostEntity;

  @ManyToOne(
    () => PatternProductEntity,
    (pattern: PatternProductEntity) => pattern.categories,
  )
  @JoinColumn({
    name: 'patternProductId',
  })
  patternProductId: PatternProductEntity;

  @ManyToOne(
    () => SewingProductEntity,
    (sewing: SewingProductEntity) => sewing.categories,
  )
  @JoinColumn({
    name: 'sewingProductId',
  })
  sewingProductId: SewingProductEntity;

  @OneToMany(() => SliderEntity, (slider: SliderEntity) => slider.categoryId)
  slider: SliderEntity[];
}
