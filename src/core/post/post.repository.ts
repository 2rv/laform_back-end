import { PostEntity } from './post.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
  async findAllRu(
    size: number,
    page: number,
    // sort: string,
    // by: any,
  ): Promise<PostEntity[]> {
    // const take = size || 10;
    // const skip = (page - 1) * size || 0;
    // .orderBy(sort, by)
    //   .limit(take)
    //   .offset(skip)
    return await this.createQueryBuilder('post')
      .leftJoin('post.image', 'image')
      .leftJoin('post.categories', 'categories')
      .select([
        'post.id',
        'post.titleRu',
        'post.createdDate',
        'post.likeCount',
        'post.modifier',
        'post.type',
        'image',
        'categories',
      ])

      .getMany();
  }
  async findAllRuAuth(
    size: number,
    page: number,
    userId: number,
    // sort: string,
    // by: any,
  ): Promise<PostEntity[]> {
    // const take = size || 10;
    // const skip = (page - 1) * size || 0;
    // .orderBy(sort, by)
    // .limit(take)
    // .offset(skip)
    return await this.createQueryBuilder('post')
      .leftJoin('post.image', 'image')
      .leftJoin('post.categories', 'categories')
      .leftJoin('post.like', 'like', 'like.userId = :userId', { userId })
      .select([
        'post.id',
        'post.titleRu',
        'post.createdDate',
        'post.likeCount',
        'post.modifier',
        'post.type',
        'image',
        'categories',
        'like',
      ])

      .getMany();
  }

  async findOneRu(id: string): Promise<PostEntity> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.image', 'image')
      .leftJoin('post.categories', 'categories')
      .select([
        'post.id',
        'post.titleRu',
        'post.createdDate',
        'post.articleText',
        'post.likeCount',
        'post.modifier',
        'post.type',
        'image',
        'categories',
      ])
      .where('post.id = :id', { id })
      .getOne();
  }
  async findOneRuAuth(id: string, userId: number): Promise<PostEntity> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.image', 'image')
      .leftJoin('post.categories', 'categories')
      .leftJoin('post.like', 'like', 'like.userId = :userId', { userId })
      .select([
        'post.id',
        'post.articleText',
        'post.titleRu',
        'post.createdDate',
        'post.likeCount',
        'post.modifier',
        'post.type',
        'image',
        'categories',
        'like',
      ])
      .where('post.id = :id', { id })
      .getOne();
  }

  async findPinnedRu(): Promise<PostEntity[]> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.image', 'image')
      .leftJoin('post.categories', 'categories')
      .select([
        'post.id',
        'post.titleRu',
        'post.modifier',
        'post.createdDate',
        'post.type',
        'post.pinned',
        'image',
        'categories',
      ])
      .where('post.pinned = true')
      .limit(3)
      .getMany();
  }
  async findPinnedRuAuth(userId: number): Promise<PostEntity[]> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.image', 'image')
      .leftJoin('post.categories', 'categories')
      .leftJoin('post.like', 'like', 'like.userId = :userId', { userId })
      .select([
        'post.id',
        'post.titleRu',
        'post.likeCount',
        'post.modifier',
        'post.type',
        'post.pinned',
        'image',
        'categories',
        'like',
      ])
      .where('post.pinned = true')
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
      .select([
        'post.id',
        'post.titleEn',
        'post.textEn',
        'post.createdDate',
        'post.articleText',
        'post.likeCount',
        'image_url',
        'category_id.textEn',
        'comment',
        'userId.login',
        'subComment',
        'user.login',
      ])
      .where('post.id = :id', { id })
      .getOne();
  }
  async findPinnedEn(): Promise<PostEntity[]> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.imageUrl', 'image_url')
      .leftJoin('post.categoryId', 'category_id')
      .leftJoin('post.comment', 'comment')
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .leftJoin('post.image', 'image')
      .leftJoin('post.categories', 'categories')
      .where('post.pinned = true')
      .select([
        'post.id',
        'post.titleEn',
        'post.modifier',
        'post.createdDate',
        'image',
        'categories',
      ])
      .where('post.pinned = true')
      .limit(3)
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
      .leftJoin('post.comment', 'comment')
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .leftJoin('post.image', 'image')
      .leftJoin('post.categories', 'categories')
      .select([
        'post.id',
        'post.titleEn',
        'post.createdDate',
        'post.articleText',
        'post.likeCount',
        'post.pinned',
        'comment',
        'userId.login',
        'subComment',
        'user.login',
        'image',
        'categories',
      ])
      //.orderBy(sort, by)
      .limit(take)
      .offset(skip)
      .getMany();
  }
  async findOneEnAuth(id: string, userId: number): Promise<PostEntity> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.imageUrl', 'image_url')
      .leftJoin('post.categoryId', 'category_id')
      .leftJoin('post.comment', 'comment')
      .leftJoin('pattern_product.like', 'like')
      .where('like.userId = :userId', { userId })
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .select([
        'post.id',
        'post.titleEn',
        'post.articleText',
        'post.textEn',
        'post.createdDate',
        'post.likeCount',
        'image_url',
        'category_id.textEn',
        'comment',
        'userId.login',
        'subComment',
        'user.login',
        'like',
      ])
      .where('post.id = :id', { id })
      .getOne();
  }
  async findPinnedEnAuth(userId: number): Promise<PostEntity[]> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.imageUrl', 'image_url')
      .leftJoin('post.categoryId', 'category_id')
      .leftJoin('post.comment', 'comment')
      .leftJoin('post.like', 'like')
      .where('like.userId = :userId', { userId })
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
        'like',
      ])
      .where('post.pinned = true')
      .getMany();
  }
  async findAllEnAuth(
    size: number,
    page: number,
    userId: number,
    // sort: string,
    // by: any,
  ): Promise<PostEntity[]> {
    const take = size || 10;
    const skip = (page - 1) * size || 0;
    return await this.createQueryBuilder('post')
      .leftJoin('post.comment', 'comment')
      .leftJoin('post.like', 'like')
      .where('like.userId = :userId', { userId })
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .leftJoin('post.image', 'image')
      .leftJoin('post.categories', 'categories')
      .select([
        'post.id',
        'post.titleEn',
        'post.createdDate',
        'post.likeCount',
        'post.pinned',
        'comment',
        'userId.login',
        'subComment',
        'user.login',
        'image',
        'categories',
        'like',
      ])
      //.orderBy(sort, by)
      .limit(take)
      .offset(skip)
      .getMany();
  }
}
