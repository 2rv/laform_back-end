import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { UserEntity } from '../user/user.entity';

import { DELIVERY_TYPE } from './enum/delivery-type.enum';

@Entity({ name: 'user_info' })
export class UserInfoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity, (user: UserEntity) => user.userSettingId)
  @JoinColumn({
    name: 'user_id',
  })
  userId: UserEntity;

  @Column({
    type: 'varchar',
    name: 'full_name',
    nullable: true,
    default: null,
  })
  fullName: string;

  @Column({
    type: 'int',
    name: 'phone',
    nullable: true,
    default: null,
  })
  phone: number;

  @Column({
    type: 'varchar',
    name: 'location',
    nullable: true,
    default: null,
  })
  location: string;

  @Column({
    type: 'enum',
    enum: DELIVERY_TYPE,
    default: DELIVERY_TYPE.ON_THE_POINT,
    nullable: false,
  })
  deliveryType: DELIVERY_TYPE;
}
