import { UserEntity } from './../user/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PostEntity } from '../post/post.entity';

@Entity({ name: 'like' })
export class LikeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => PostEntity, (post: PostEntity) => post.like)
  @JoinColumn({
    name: 'post_id',
  })
  postId: PostEntity;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.like)
  @JoinColumn({
    name: 'user_id',
  })
  userId: UserEntity;
}
