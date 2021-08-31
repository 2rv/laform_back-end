import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { UserEntity } from '../user/user.entity';

import { DELIVERY_TYPE } from './enum/delivery-type.enum';

@Entity({ name: 'userDeliveryInfo' })
export class UserDeliveryInfoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @Column({ nullable: true, default: null })
  fullname: string;

  @Column({ nullable: true, default: null })
  phone: string;

  @Column({ nullable: true, default: null })
  location: string;

  @Column({
    type: 'enum',
    enum: DELIVERY_TYPE,
    default: DELIVERY_TYPE.ON_THE_POINT,
    nullable: false,
  })
  deliveryType: DELIVERY_TYPE;
}
