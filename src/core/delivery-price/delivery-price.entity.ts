import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'delivery_price' })
export class DeliveryPriceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'delivery_type',
  })
  deliveryType: string;

  @Column({
    type: 'numeric',
    name: 'delivery_type_price',
    default: 0,
  })
  deliveryTypePrice: number;
}
