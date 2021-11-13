import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';

// import { UserEntity } from '../user/user.entity';
// import { WearEntity } from '../wear/wear.entity';
// import { UserProfileEntity } from '../user-profile-settings/user-profile-settings.entity';

@Entity({ name: 'sdek' })
export class FileUploadEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'test',
  })
  fileUrl!: string;

  // @ManyToOne(() => UserEntity, (user: UserEntity) => user.imageUrls)
  // @JoinColumn({
  //   name: 'user_id',
  // })
  // userId: UserEntity;

  // @OneToOne(() => UserProfileEntity, (file: UserProfileEntity) => file.avatar)
  // userProfileId: UserProfileEntity;

  // @OneToMany(() => WearEntity, (wear: WearEntity) => wear.fileId)
  // wearId: WearEntity[];
}
