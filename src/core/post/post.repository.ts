import { PostEntity } from './post.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
  async findOneRu(id: string): Promise<PostEntity> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.imageUrl', 'image_url')
      .leftJoin('post.categoryId', 'category_id')
      .leftJoin('post.comment', 'comment')
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .where('post.id = :id', { id })
      .select([
        'post.id',
        'post.titleRu',
        'post.textRu',
        'post.createdDate',
        'post.likeCount',
        'image_url',
        'category_id.textRu',
        'comment',
        'userId.login',
        'subComment',
        'user.login',
      ])
      .getOne();
  }

  async findBestRu(): Promise<PostEntity[]> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.imageUrl', 'image_url')
      .leftJoin('post.categoryId', 'category_id')
      .select([
        'post.id',
        'post.titleRu',
        'post.textRu',
        'post.likeCount',
        'post.createdDate',
        'image_url',
        'category_id.textRu',
      ])
      .orderBy('RANDOM()')
      .limit(3)
      .getMany();
  }

  async findPinnedRu(): Promise<PostEntity[]> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.imageUrl', 'image_url')
      .leftJoin('post.categoryId', 'category_id')
      .where('post.pinned = true')
      .select([
        'post.id',
        'post.titleRu',
        'post.textRu',
        'post.createdDate',
        'post.likeCount',
        'image_url',
        'category_id.textRu',
      ])
      .getMany();
  }

  async findAllRu(
    size: number,
    page: number,
    // sort: string,
    // by: any,
  ): Promise<PostEntity[]> {
    const take = size || 10;
    const skip = (page - 1) * size || 0;
    return await this.createQueryBuilder('post')
      .leftJoin('post.imageUrl', 'image_url')
      .leftJoin('post.categoryId', 'category_id')
      .leftJoin('post.comment', 'comment')
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .select([
        'post.id',
        'post.titleRu',
        'post.textRu',
        'post.createdDate',
        'post.likeCount',
        'post.pinned',
        'image_url',
        'category_id.textRu',
        'comment',
        'userId.login',
        'subComment',
        'user.login',
      ])
      // .orderBy(sort, by)
      .limit(take)
      .offset(skip)
      .getMany();
  }

  async findOneEn(id: string): Promise<PostEntity> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.imageUrl', 'image_url')
      .leftJoin('post.categoryId', 'category_id')
      .leftJoin('post.comment', 'comment')
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .where('post.id = :id', { id })
      .select([
        'post.id',
        'post.titleEn',
        'post.textEn',
        'post.createdDate',
        'post.likeCount',
        'image_url',
        'category_id.textEn',
        'comment',
        'userId.login',
        'subComment',
        'user.login',
      ])
      .getOne();
  }

  async findBestEn(): Promise<PostEntity[]> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.imageUrl', 'image_url')
      .leftJoin('post.categoryId', 'category_id')
      .leftJoin('post.comment', 'comment')
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .select([
        'post.id',
        'post.titleEn',
        'post.textEn',
        'post.createdDate',
        'post.likeCount',
        'image_url',
        'category_id.textEn',
        'comment',
        'userId.login',
        'subComment',
        'user.login',
      ])
      .orderBy('RANDOM()')
      .limit(3)
      .getMany();
  }

  async findPinnedEn(): Promise<PostEntity[]> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.imageUrl', 'image_url')
      .leftJoin('post.categoryId', 'category_id')
      .leftJoin('post.comment', 'comment')
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .where('post.pinned = true')
      .select([
        'post.id',
        'post.titleEn',
        'post.textEn',
        'post.createdDate',
        'post.likeCount',
        'image_url',
        'category_id.textEn',
        'comment',
        'userId.login',
        'subComment',
        'user.login',
      ])
      .getMany();
  }

  async findAllEn(
    size: number,
    page: number,
    // sort: string,
    // by: any,
  ): Promise<PostEntity[]> {
    const take = size || 10;
    const skip = (page - 1) * size || 0;
    return await this.createQueryBuilder('post')
      .leftJoin('post.imageUrl', 'image_url')
      .leftJoin('post.categoryId', 'category_id')
      .leftJoin('post.comment', 'comment')
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .select([
        'post.id',
        'post.titleEn',
        'post.textEn',
        'post.createdDate',
        'post.likeCount',
        'post.pinned',
        'image_url',
        'category_id.textEn',
        'comment',
        'userId.login',
        'subComment',
        'user.login',
      ])
      //.orderBy(sort, by)
      .limit(take)
      .offset(skip)
      .getMany();
  }
}
