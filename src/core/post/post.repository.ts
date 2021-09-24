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
      .where('post.deleted = false')
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
      .where('post.deleted = false')
      .getMany();
  }

  async findOneRu(id: string): Promise<PostEntity> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.image', 'image')
      .leftJoin('post.categories', 'categories')
      .leftJoin('post.recommendationProduct', 'recommendations')
      .leftJoin('recommendations.masterClassId', 'recommendations_master_class')
      .leftJoin(
        'recommendations_master_class.images',
        'recommendations_master_class_images',
      )
      .leftJoin(
        'recommendations_master_class.programs',
        'recommendations_master_class_programs',
      )

      .leftJoin(
        'recommendations.patternProductId',
        'recommendations_pattern_product',
      )
      .leftJoin(
        'recommendations_pattern_product.images',
        'recommendations_pattern_product_images',
      )
      .leftJoin(
        'recommendations_pattern_product.sizes',
        'recommendations_pattern_product_sizes',
      )
      .leftJoin(
        'recommendations.sewingProductId',
        'recommendations_sewing_product',
      )
      .leftJoin(
        'recommendations_sewing_product.images',
        'recommendations_sewing_product_images',
      )
      .leftJoin(
        'recommendations_sewing_product.sizes',
        'recommendations_sewing_product_sizes',
      )
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

        'recommendations.id',
        'recommendations_master_class.id',
        'recommendations_master_class.titleRu',
        'recommendations_master_class.modifier',
        'recommendations_master_class.discount',
        'recommendations_master_class.type',
        'recommendations_master_class_images',
        'recommendations_master_class_programs.id',
        'recommendations_master_class_programs.price',

        'recommendations_pattern_product.id',
        'recommendations_pattern_product.titleRu',
        'recommendations_pattern_product.type',
        'recommendations_pattern_product.modifier',
        'recommendations_pattern_product.complexity',
        'recommendations_pattern_product.discount',
        'recommendations_pattern_product_images',
        'recommendations_pattern_product_sizes.id',
        'recommendations_pattern_product_sizes.price',

        'recommendations_sewing_product.id',
        'recommendations_sewing_product.titleRu',
        'recommendations_sewing_product.discount',
        'recommendations_sewing_product.modifier',
        'recommendations_sewing_product.type',
        'recommendations_sewing_product_images',
        'recommendations_sewing_product_sizes.id',
        'recommendations_sewing_product_sizes.size',
        'recommendations_sewing_product_sizes.price',

        'recommendations_post.id',
        'recommendations_post.titleRu',
        'recommendations_post.createdDate',
        'recommendations_post.likeCount',
        'recommendations_post.modifier',
        'recommendations_post.type',
        'recommendations_post_image',
      ])
      .where('recommendations_sewing_product.deleted = false')
      .where('recommendations_master_class.deleted = false')
      .where('recommendations_pattern_product.deleted = false')
      .where('recommendations_post.deleted = false')
      .where('post.id = :id', { id })
      .getOne();
  }
  async findOneRuAuth(id: string, userId: number): Promise<PostEntity> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.image', 'image')
      .leftJoin('post.categories', 'categories')
      .leftJoin('post.like', 'like', 'like.userId = :userId', { userId })
      .leftJoin('post.recommendationProduct', 'recommendations')
      .leftJoin('recommendations.masterClassId', 'recommendations_master_class')
      .leftJoin(
        'recommendations_master_class.images',
        'recommendations_master_class_images',
      )
      .leftJoin(
        'recommendations_master_class.programs',
        'recommendations_master_class_programs',
      )
      .leftJoin(
        'recommendations_master_class.like',
        'recommendations_master_class_like',
        'recommendations_master_class_like.userId = :userId',
        {
          userId,
        },
      )

      .leftJoin(
        'recommendations.patternProductId',
        'recommendations_pattern_product',
      )
      .leftJoin(
        'recommendations_pattern_product.images',
        'recommendations_pattern_product_images',
      )
      .leftJoin(
        'recommendations_pattern_product.sizes',
        'recommendations_pattern_product_sizes',
      )
      .leftJoin(
        'recommendations_pattern_product.like',
        'recommendations_pattern_product_like',
        'recommendations_pattern_product_like.userId = :userId',
        {
          userId,
        },
      )

      .leftJoin(
        'recommendations.sewingProductId',
        'recommendations_sewing_product',
      )
      .leftJoin(
        'recommendations_sewing_product.images',
        'recommendations_sewing_product_images',
      )
      .leftJoin(
        'recommendations_sewing_product.sizes',
        'recommendations_sewing_product_sizes',
      )
      .leftJoin(
        'recommendations_sewing_product.like',
        'recommendations_sewing_product_like',
        'recommendations_sewing_product_like.userId = :userId',
        {
          userId,
        },
      )

      .leftJoin('recommendations.postId', 'recommendations_post')
      .leftJoin('recommendations_post.image', 'recommendations_post_image')
      .leftJoin(
        'recommendations_post.like',
        'recommendations_post_like',
        'recommendations_post_like.userId = :userId',
        {
          userId,
        },
      )

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

        'recommendations.id',
        'recommendations_master_class.id',
        'recommendations_master_class.titleRu',
        'recommendations_master_class.modifier',
        'recommendations_master_class.discount',
        'recommendations_master_class.type',
        'recommendations_master_class_images',
        'recommendations_master_class_programs.id',
        'recommendations_master_class_programs.price',
        'recommendations_master_class_like',

        'recommendations_pattern_product.id',
        'recommendations_pattern_product.titleRu',
        'recommendations_pattern_product.type',
        'recommendations_pattern_product.modifier',
        'recommendations_pattern_product.complexity',
        'recommendations_pattern_product.discount',
        'recommendations_pattern_product_images',
        'recommendations_pattern_product_sizes.id',
        'recommendations_pattern_product_sizes.price',
        'recommendations_pattern_product_like',

        'recommendations_sewing_product.id',
        'recommendations_sewing_product.titleRu',
        'recommendations_sewing_product.discount',
        'recommendations_sewing_product.modifier',
        'recommendations_sewing_product.type',
        'recommendations_sewing_product_images',
        'recommendations_sewing_product_sizes.id',
        'recommendations_sewing_product_sizes.size',
        'recommendations_sewing_product_sizes.price',
        'recommendations_sewing_product_like',

        'recommendations_post.id',
        'recommendations_post.titleRu',
        'recommendations_post.createdDate',
        'recommendations_post.likeCount',
        'recommendations_post.modifier',
        'recommendations_post.type',
        'recommendations_post_image',
        'recommendations_post_like',
      ])
      .where('recommendations_sewing_product.deleted = false')
      .where('recommendations_master_class.deleted = false')
      .where('recommendations_pattern_product.deleted = false')
      .where('recommendations_post.deleted = false')
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

  async findLikedRu(userId: number): Promise<PostEntity[]> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.image', 'image')
      .leftJoin('post.categories', 'categories')
      .leftJoin('post.like', 'like')
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
      .where('sewing_product.deleted = false')
      .andWhere('like.userId = :userId', { userId })
      .getMany();
  }
  async findLikedEn(userId: number): Promise<PostEntity[]> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.image', 'image')
      .leftJoin('post.categories', 'categories')
      .leftJoin('post.like', 'like')
      .select([
        'post.id',
        'post.titleEn',
        'post.createdDate',
        'post.likeCount',
        'post.modifier',
        'post.type',
        'image',
        'categories',
        'like',
      ])
      .where('sewing_product.deleted = false')
      .andWhere('like.userId = :userId', { userId })
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
