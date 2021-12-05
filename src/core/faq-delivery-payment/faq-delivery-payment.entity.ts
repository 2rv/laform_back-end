import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'faq-delivery-and-payment' })
export class FaqDeliveryPaymentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'json',
    name: 'data',
    nullable: true,
  })
  data: {
    blocks: [];
    time: number;
    version: string;
  };
}
