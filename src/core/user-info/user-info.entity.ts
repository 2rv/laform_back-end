import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

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

  @Column({ name: 'google_id', nullable: true })
  googleId: string;

  @Column({ name: 'apple_id', nullable: true })
  appleId: string;

  @Column({ name: 'facebook_id', nullable: true })
  facebookId: string;

  @Column({
    type: 'varchar',
    name: 'country',
    nullable: true,
    default: null,
  })
  country: string;

  @Column({
    type: 'varchar',
    name: 'country_iso_code',
    nullable: true,
    default: null,
  })
  country_iso_code: string;

  @Column({
    type: 'varchar',
    name: 'label_country',
    nullable: true,
    default: null,
  })
  label_country: string;

  @Column({
    type: 'varchar',
    name: 'city',
    nullable: true,
    default: null,
  })
  city: string;

  @Column({
    type: 'varchar',
    name: 'fias_id',
    nullable: true,
    default: null,
  })
  fias_id: string;

  @Column({
    type: 'varchar',
    name: 'fias_level_city',
    nullable: true,
    default: null,
  })
  fias_level_city: string;

  @Column({
    type: 'varchar',
    name: 'kladr_id',
    nullable: true,
    default: null,
  })
  kladr_id: string;

  @Column({
    type: 'varchar',
    name: 'label_city',
    nullable: true,
    default: null,
  })
  label_city: string;

  @Column({
    type: 'varchar',
    name: 'settlement',
    nullable: true,
    default: null,
  })
  settlement: string;

  @Column({
    type: 'varchar',
    name: 'fias_id_street',
    nullable: true,
    default: null,
  })
  fias_id_street: string;

  @Column({
    type: 'varchar',
    name: 'fias_level_street',
    nullable: true,
    default: null,
  })
  fias_level_street: string;

  @Column({
    type: 'varchar',
    name: 'label_street',
    nullable: true,
    default: null,
  })
  label_street: string;

  @Column({
    type: 'varchar',
    name: 'street',
    nullable: true,
    default: null,
  })
  street: string;

  @Column({
    type: 'varchar',
    name: 'fias_id_house',
    nullable: true,
    default: null,
  })
  fias_id_house: string;

  @Column({
    type: 'varchar',
    name: 'fias_level_house',
    nullable: true,
    default: null,
  })
  fias_level_house: string;

  @Column({
    type: 'varchar',
    name: 'house',
    nullable: true,
    default: null,
  })
  house: string;

  @Column({
    type: 'varchar',
    name: 'label_house',
    nullable: true,
    default: null,
  })
  label_house: string;

  @Column({
    type: 'varchar',
    name: 'label_postal_code',
    nullable: true,
    default: null,
  })
  label_postal_code: string;

  @Column({
    type: 'varchar',
    name: 'postal_code',
    nullable: true,
    default: null,
  })
  postal_code: string;
}
