import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
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

  @ManyToOne(
    () => SewingProductEntity,
    (sewingProducts: SewingProductEntity) => sewingProducts.colors,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({
    name: 'sewingProductId',
  })
  sewingProductId: SewingProductEntity;
}
