import {
  Entity,
  Unique,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import {
  generatePasswordSalt,
  generateBcryptHash,
} from '../../common/utils/hash';
import { USER_ROLE } from './enum/user-role.enum';
import { PurchaseEntity } from '../purchase/purchase.entity';
import { CommentEntity } from '../comment/comment.entity';
import { LikeEntity } from '../like/like.entity';
import { UserInfoEntity } from '../user-info/user-info.entity';
import { Transform } from 'class-transformer';

@Entity({ name: 'user' })
@Unique(['login', 'email'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  @Transform((value: string) => value?.trim())
  @Transform((value: string) => value?.toLowerCase())
  login: string;

  @Column({ unique: true, nullable: true })
  @Transform((value: string) => value?.trim())
  email: string;

  @Column({ nullable: true })
  @Transform((value: string) => value?.trim())
  password: string;

  @Column({
    type: 'enum',
    enum: USER_ROLE,
    default: USER_ROLE.USER,
    nullable: false,
  })
  role: USER_ROLE;

  @Column({ default: false })
  emailConfirmed: boolean;

  @Column({ default: true })
  notificationEmail: boolean;

  @Column({ name: 'google_id', nullable: true })
  googleId?: string;

  @Column({ name: 'facebook_id', nullable: true })
  facebookId?: string;

  @CreateDateColumn()
  createDate: string;

  static async hashPassword(password: string): Promise<string> {
    const salt = await generatePasswordSalt(password);
    return generateBcryptHash(password, salt);
  }

  async validatePassword(password: string): Promise<boolean> {
    const salt = await generatePasswordSalt(password);
    const hashPassword = generateBcryptHash(password, salt);
    return this.password === hashPassword;
  }

  @OneToMany(() => LikeEntity, (like: LikeEntity) => like.userId)
  like: LikeEntity[];

  @OneToMany(
    () => PurchaseEntity,
    (purchase: PurchaseEntity) => purchase.userId,
  )
  purchase: PurchaseEntity[];

  @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.userId)
  comment: CommentEntity[];

  @OneToOne(
    () => UserInfoEntity,
    (userSettingsInfo: UserInfoEntity) => userSettingsInfo.userId,
  )
  userSettingId: UserInfoEntity;
}
