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
  })
  fullName: string;

  @Column({
    type: 'varchar',
    name: 'phone',
    nullable: true,
  })
  phone: string;

  @Column({ name: 'google_id', nullable: true })
  googleId: string;

  @Column({ name: 'apple_id', nullable: true })
  appleId: string;

  @Column({ name: 'facebook_id', nullable: true })
  facebookId: string;
}
