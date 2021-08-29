import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { PatternProductEntity } from '../pattern-product/pattern-product.entity';
import { SewingProductEntity } from '../sewing-product/sewing-product.entity';

@Entity({ name: 'sizes' })
export class SizesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'size',
  })
  size!: string;

  @Column({
    type: 'int',
    name: 'price',
  })
  price!: number;

  @ManyToOne(
    () => PatternProductEntity,
    (pattern: PatternProductEntity) => pattern.sizes,
  )
  @JoinColumn({
    name: 'patternProductId',
  })
  patternProductId: PatternProductEntity;

  @ManyToOne(
    () => SewingProductEntity,
    (pattern: SewingProductEntity) => pattern.sizes,
  )
  @JoinColumn({
    name: 'sewingProductId',
  })
  sewingProductId: SewingProductEntity;
}
