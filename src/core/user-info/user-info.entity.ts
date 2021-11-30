import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { PAYMENT_TYPE } from './enum/payment-type.enum';

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
    type: 'varchar',
    name: 'phone',
    nullable: true,
    default: null,
  })
  phone: string;

  @Column({
    type: 'varchar',
    name: 'location',
    nullable: true,
    default: null,
  })
  location: string;

  @Column({
    type: 'varchar',
    name: 'delivery_type',
    default: null,
    nullable: true,
  })
  deliveryType: string;

  @Column({
    type: 'enum',
    enum: PAYMENT_TYPE,
    default: PAYMENT_TYPE.ONLINE,
    nullable: false,
  })
  paymentType: PAYMENT_TYPE;

  @Column({ name: 'google_id', nullable: true })
  googleId: string;

  @Column({ name: 'apple_id', nullable: true })
  appleId: string;

  @Column({ name: 'facebook_id', nullable: true })
  facebookId: string;
}
