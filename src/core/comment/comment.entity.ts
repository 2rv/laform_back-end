import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { PostEntity } from '../post/post.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'comment' })
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'text',
  })
  text!: string;

  @CreateDateColumn({
    name: 'create_date',
  })
  createDate: Date;

  @ManyToOne(() => PostEntity, (post: PostEntity) => post.comment)
  @JoinColumn({
    name: 'post_id',
  })
  postId!: PostEntity;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.comment)
  @JoinColumn({
    name: 'user_id',
  })
  userId!: UserEntity;

  @OneToMany(
    () => SubCommentEntity,
    (subComment: SubCommentEntity) => subComment.commentId,
  )
  subComment: SubCommentEntity[];
}

@Entity({ name: 'sub_comment' })
export class SubCommentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'text',
  })
  text!: string;

  @CreateDateColumn({
    name: 'create_date',
  })
  createDate: Date;

  @ManyToOne(() => PostEntity, (post: PostEntity) => post.comment)
  @JoinColumn({
    name: 'post_id',
  })
  postId!: PostEntity;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.comment)
  @JoinColumn({
    name: 'user_id',
  })
  userId!: UserEntity;

  @ManyToOne(
    () => CommentEntity,
    (comment: CommentEntity) => comment.subComment,
  )
  @JoinColumn({
    name: 'comment_id',
  })
  commentId!: CommentEntity;
}
