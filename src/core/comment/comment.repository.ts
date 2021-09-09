import { CommentEntity, SubCommentEntity } from './comment.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {
  async findPostComment(postId: string): Promise<CommentEntity[]> {
    return await this.createQueryBuilder('comment')
      .leftJoin('comment.userId', 'user')
      .where('comment.postId = :postId', { postId })
      .select([
        'comment.id',
        'comment.text',
        'comment.createDate',
        'comment.postId',
        'user.login',
        'user.id',
      ])
      .getMany()
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }

  async findMasterClassComment(
    masterClassId: string,
  ): Promise<CommentEntity[]> {
    return await this.createQueryBuilder('comment')
      .leftJoin('comment.userId', 'user_id')
      .leftJoin('comment.subComment', 'subComment')
      .where('comment.masterClassId = :masterClassId', { masterClassId })
      .select([
        'comment.id',
        'comment.text',
        'comment.createDate',
        'comment.postId',
        'user_id.login',
        'user_id.id',
        'subComment',
      ])
      .getMany()
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }

  async findAllUserComments(userId): Promise<CommentEntity[]> {
    return await this.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.postId', 'post_id')
      .leftJoinAndSelect('comment.masterClassId', 'master_class_id')
      .leftJoinAndSelect('comment.sewingProductId', 'sewing_product_id')
      .leftJoinAndSelect('comment.patternProductId', 'pattern_product_id')
      .where('comment.userId = :userId', { userId })
      .getMany();
  }

  async findOneComment(id: string): Promise<CommentEntity> {
    return await this.createQueryBuilder('comment')
      .leftJoin('comment.userId', 'user_id')
      .where('comment.id = :id', { id })
      .select([
        'comment.id',
        'comment.text',
        'comment.createDate',
        'comment.postId',
        'user_id.login',
        'user_id.id',
      ])
      .getOne()
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }
}

@EntityRepository(SubCommentEntity)
export class SubCommentRepository extends Repository<SubCommentEntity> {
  async findAll(postId, commentId): Promise<SubCommentEntity[]> {
    return await this.createQueryBuilder('sub_comment')
      .leftJoin('sub_comment.userId', 'user_id')
      .where('sub_comment.postId = :postId', { postId })
      .andWhere('sub_comment.commentId = :commentId', { commentId })
      .select([
        'sub_comment.id',
        'sub_comment.text',
        'sub_comment.createDate',
        'user_id.login',
        'user_id.id',
      ])
      .getMany()
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }

  async findAllToOneComment(commentId: string): Promise<SubCommentEntity[]> {
    return await this.createQueryBuilder('sub_comment')
      .leftJoin('sub_comment.userId', 'user_id')
      .where('sub_comment.commentId = :commentId', { commentId })
      .select([
        'sub_comment.id',
        'sub_comment.text',
        'sub_comment.createDate',
        'user_id.login',
        'user_id.id',
      ])
      .getMany()
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }
}
