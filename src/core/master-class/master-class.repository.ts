import { MasterClassEntity } from './master-class.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(MasterClassEntity)
export class MasterClassRepository extends Repository<MasterClassEntity> {
  async findAllRu(size: number, page: number): Promise<MasterClassEntity[]> {
    // const take = size || 100;
    // const skip = (page - 1) * size || 0;
    // .limit(take)
    // .offset(skip)
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.categories', 'categories')
      .leftJoin('master_class.programs', 'programs')
      .select([
        'master_class.id',
        'master_class.titleRu',
        'master_class.modifier',
        'master_class.discount',
        'master_class.type',
        'images',
        'categories',
        'programs.id',
        'programs.price',
      ])
      .where('master_class.deleted = false')
      .getMany();
  }
  async findAllRuAuth(
    size: number,
    page: number,
    userId: number,
  ): Promise<MasterClassEntity[]> {
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.categories', 'categories')
      .leftJoin('master_class.programs', 'programs')
      .leftJoin('master_class.like', 'like', 'like.userId = :userId', {
        userId,
      })
      .select([
        'master_class.id',
        'master_class.titleRu',
        'master_class.modifier',
        'master_class.discount',
        'master_class.type',
        'images',
        'categories',
        'programs.id',
        'programs.price',
        'like',
      ])
      .where('master_class.deleted = false')
      .getMany();
  }

  async findOneRu(id: string): Promise<MasterClassEntity> {
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.categories', 'categories')
      .leftJoin('master_class.programs', 'programs')
      .leftJoin('master_class.recommendation', 'recommendation')
      .leftJoin('recommendation.recommendationProducts', 'recommendations')
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

      .leftJoin('recommendations.postId', 'recommendations_post')
      .leftJoin('recommendations_post.image', 'recommendations_post_image')
      .select([
        'master_class.id',
        'master_class.titleRu',
        'master_class.descriptionRu',
        'master_class.modifier',
        'master_class.discount',
        'master_class.type',
        'images',
        'categories',
        'programs.id',
        'programs.vendorCode',
        'programs.price',
        'programs.programNameRu',

        'recommendation.id',
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
      .where('master_class.id = :id', { id })
      .getOne();
  }
  async findOneRuAuth(id: string, userId: number): Promise<MasterClassEntity> {
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.categories', 'categories')
      .leftJoin('master_class.programs', 'programs')
      .leftJoin('master_class.like', 'like', 'like.userId = :userId', {
        userId,
      })
      .leftJoin('master_class.recommendation', 'recommendation')
      .leftJoin('recommendation.recommendationProducts', 'recommendations')
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
        'master_class.id',
        'master_class.titleRu',
        'master_class.descriptionRu',
        'master_class.modifier',
        'master_class.discount',
        'master_class.type',
        'images',
        'categories',
        'programs.id',
        'programs.vendorCode',
        'programs.price',
        'programs.programNameRu',
        'like',

        'recommendation.id',
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
      .where('master_class.id = :id', { id })
      .getOne();
  }

  async findPinnedRu(): Promise<MasterClassEntity[]> {
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.categories', 'categories')
      .leftJoin('master_class.programs', 'programs')
      .select([
        'master_class.id',
        'master_class.titleRu',
        'master_class.modifier',
        'master_class.discount',
        'master_class.type',
        'master_class.pinned',
        'images',
        'categories',
        'programs.id',
        'programs.price',
      ])
      .where('master_class.pinned = true')
      .getMany();
  }
  async findPinnedRuAuth(userId: number): Promise<MasterClassEntity[]> {
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.categories', 'categories')
      .leftJoin('master_class.programs', 'programs')
      .leftJoin('master_class.like', 'like', 'like.userId = :userId', {
        userId,
      })
      .select([
        'master_class.id',
        'master_class.titleRu',
        'master_class.modifier',
        'master_class.discount',
        'master_class.type',
        'master_class.pinned',
        'images',
        'categories',
        'programs.id',
        'programs.price',
        'like',
      ])
      .where('master_class.pinned = true')
      .getMany();
  }

  async findLikedRu(userId: number): Promise<MasterClassEntity[]> {
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.categories', 'categories')
      .leftJoin('master_class.programs', 'programs')
      .leftJoin('master_class.like', 'like')
      .select([
        'master_class.id',
        'master_class.titleRu',
        'master_class.modifier',
        'master_class.discount',
        'master_class.type',
        'images',
        'categories',
        'programs.id',
        'programs.price',
        'like',
      ])
      .where('master_class.deleted = false')
      .andWhere('like.userId = :userId', { userId })
      .getMany();
  }

  async findOneEn(id: string): Promise<MasterClassEntity> {
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.comment', 'comment')
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.programs', 'programs')
      .leftJoin('master_class.categories', 'categories')
      .select([
        'master_class.id',
        'master_class.titleEn',
        'master_class.descriptionEn',
        'master_class.modifier',
        'master_class.discount',
        'master_class.type',
        'master_class.pinned',
        'comment',
        'userId.login',
        'subComment',
        'user.login',
        'images',
        'programs.id',
        'programs.vendorCode',
        'programs.price',
        'programs.programNameRu',
        'categories',
      ])
      .where('master_class.id = :id', { id })
      .getOne();
  }
  async findAllEn(size: number, page: number): Promise<MasterClassEntity[]> {
    const take = size || 10;
    const skip = (page - 1) * size || 0;
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.programs', 'programs')
      .leftJoin('master_class.categories', 'categories')
      .select([
        'master_class.id',
        'master_class.titleEn',
        'master_class.descriptionEn',
        'master_class.modifier',
        'master_class.discount',
        'master_class.type',
        'master_class.pinned',
        'images',
        'programs.id',
        'programs.vendorCode',
        'programs.price',
        'programs.programNameRu',
        'categories',
      ])
      .where('master_class.deleted = false')
      .limit(take)
      .offset(skip)
      .getMany();
  }
  async findPinnedEn(): Promise<MasterClassEntity[]> {
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.programs', 'programs')
      .leftJoin('master_class.categories', 'categories')
      .select([
        'master_class.id',
        'master_class.titleEn',
        'master_class.descriptionEn',
        'master_class.modifier',
        'master_class.discount',
        'master_class.type',
        'images',
        'categories',
        'programs.id',
        'programs.vendorCode',
        'programs.price',
        'programs.programNameRu',
        'master_class.pinned',
      ])
      .where('master_class.pinned = true')
      .getMany();
  }
  async findOneEnAuth(id: string, userId: number): Promise<MasterClassEntity> {
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.comment', 'comment')
      .leftJoin('master_class.like', 'like')
      .where('like.userId = :userId', { userId })
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .select([
        'master_class.id',
        'master_class.titleEn',
        'master_class.descriptionEn',
        'master_class.modifier',
        'master_class.discount',
        'master_class.type',
        'master_class.pinned',
        'comment',
        'userId.login',
        'subComment',
        'user.login',
        'like',
      ])
      .where('master_class.id = :id', { id })
      .getOne();
  }
  async findAllEnAuth(
    size: number,
    page: number,
    userId: number,
  ): Promise<MasterClassEntity[]> {
    const take = size || 10;
    const skip = (page - 1) * size || 0;
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.comment', 'comment')
      .leftJoin('master_class.like', 'like')
      .where('like.userId = :userId', { userId })
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.programs', 'programs')
      .leftJoin('master_class.categories', 'categories')
      .select([
        'master_class.id',
        'master_class.titleEn',
        'master_class.descriptionEn',
        'master_class.modifier',
        'master_class.discount',
        'master_class.type',
        'master_class.pinned',
        'comment',
        'userId.login',
        'subComment',
        'user.login',
        'images',
        'programs',
        'categories',
        'like',
      ])
      .where('master_class.deleted = false')
      .limit(take)
      .offset(skip)
      .getMany();
  }
  async findPinnedEnAuth(userId: number): Promise<MasterClassEntity[]> {
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.comment', 'comment')
      .leftJoin('master_class.like', 'like')
      .where('like.userId = :userId', { userId })
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .select([
        'master_class.id',
        'master_class.titleEn',
        'master_class.descriptionEn',
        'master_class.modifier',
        'master_class.discount',
        'master_class.type',
        'master_class.pinned',
        'comment',
        'userId.login',
        'subComment',
        'user.login',
        'like',
      ])
      .where('master_class.pinned = true')
      .getMany();
  }
  async findLikedEn(userId: number): Promise<MasterClassEntity[]> {
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.like', 'like')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.categories', 'categories')
      .leftJoin('master_class.programs', 'programs')
      .select([
        'master_class.id',
        'master_class.titleEn',
        'master_class.descriptionEn',
        'master_class.modifier',
        'master_class.discount',
        'master_class.type',
        'master_class.pinned',
        'images',
        'categories',
        'programs',
        'like',
      ])
      .where('like.userId = :userId', { userId })
      .getMany();
  }
}
