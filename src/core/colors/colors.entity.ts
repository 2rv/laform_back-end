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

@Entity({ name: 'colors' })
export class ColorsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'color',
  })
  color!: string;

  @Column({
    type: 'int',
    name: 'price',
  })
  price!: number;

  @ManyToOne(
    () => SewingProductEntity,
    (sewingProducts: SewingProductEntity) => sewingProducts.colors,
  )
  @JoinColumn({
    name: 'sewingProductId',
  })
  sewingProductId: SewingProductEntity;
}
