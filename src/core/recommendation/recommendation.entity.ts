import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { MasterClassEntity } from '../master-class/master-class.entity';
import { PatternProductEntity } from '../pattern-product/pattern-product.entity';
import { SewingProductEntity } from '../sewing-product/sewing-product.entity';
import { RecommendationProductEntity } from '../recommendation-product/recommendation-product.entity';

@Entity({ name: 'recommendation' })
export class RecommendationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(
    () => MasterClassEntity,
    (masterClass: MasterClassEntity) => masterClass.recommendation,
  )
  @JoinColumn({
    name: 'master_class_id',
  })
  masterClassId: MasterClassEntity;

  @ManyToOne(
    () => PatternProductEntity,
    (patternProduct: PatternProductEntity) => patternProduct.recommendation,
  )
  @JoinColumn({
    name: 'pattern_product_id',
  })
  patternProductId: PatternProductEntity;

  @ManyToOne(
    () => SewingProductEntity,
    (sewingProduct: SewingProductEntity) => sewingProduct.recommendation,
  )
  @JoinColumn({
    name: 'sewing_product_id',
  })
  sewingProductId: SewingProductEntity;

  @OneToMany(
    () => RecommendationProductEntity,
    (recommendationProduct: RecommendationProductEntity) =>
      recommendationProduct.recommendation,
    { cascade: true, onDelete: 'CASCADE' },
  )
  recommendationProducts: RecommendationProductEntity[];

  @CreateDateColumn({
    name: 'created_date',
    readonly: true,
  })
  createdDate: Date;
}
