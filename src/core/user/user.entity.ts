import {
  Entity,
  Unique,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import {
  generatePasswordSalt,
  generateBcryptHash,
} from '../../common/utils/hash';
import { USER_ROLE } from './enum/user-role.enum';
import { LikeEntity } from '../like/like.entity';

@Entity({ name: 'user' })
@Unique(['login', 'email'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  login: string;

  @Column({ name: 'google_id', nullable: true })
  googleId?: string;

  @Column({ name: 'facebook_id', nullable: true })
  facebookId?: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
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

  @OneToMany(() => LikeEntity, (like: LikeEntity) => like.postId)
  like: LikeEntity[];
}
