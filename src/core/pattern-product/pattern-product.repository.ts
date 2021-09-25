import { PatternProductEntity } from './pattern-product.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PatternProductEntity)
export class PatternProductRepository extends Repository<PatternProductEntity> {
  async findAllRu(size: number, page: number): Promise<PatternProductEntity[]> {
    // const take = size || 100;
    // const skip = (page - 1) * size || 0;
    // .limit(take)
    // .offset(skip)
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.sizes', 'sizes')
      .leftJoin('pattern_product.categories', 'categories')
      .select([
        'pattern_product.id',
        'pattern_product.titleRu',
        'pattern_product.type',
        'pattern_product.modifier',
        'pattern_product.complexity',
        'pattern_product.discount',
        'images',
        'sizes.id',
        'sizes.price',
        'categories',
      ])
      .where('pattern_product.deleted = false')
      .getMany();
  }
  async findAllRuAuth(
    size: number,
    page: number,
    userId: number,
  ): Promise<PatternProductEntity[]> {
    // const take = size || 100;
    // const skip = (page - 1) * size || 0;
    // .limit(take)
    // .offset(skip)
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.sizes', 'sizes')
      .leftJoin('pattern_product.categories', 'categories')
      .leftJoin('pattern_product.like', 'like', 'like.userId = :userId', {
        userId,
      })
      .select([
        'pattern_product.id',
        'pattern_product.titleRu',
        'pattern_product.type',
        'pattern_product.modifier',
        'pattern_product.complexity',
        'pattern_product.discount',
        'images',
        'sizes',
        'categories',
        'like',
      ])
      .where('pattern_product.deleted = false')
      .getMany();
  }

  async findOneRu(id: string): Promise<PatternProductEntity> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.categories', 'categories')
      .leftJoin('pattern_product.sizes', 'sizes')
      .leftJoin('pattern_product.recommendationProduct', 'recommendations')
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
        'pattern_product.id',
        'pattern_product.titleRu',
        'pattern_product.descriptionRu',
        'pattern_product.type',
        'pattern_product.modifier',
        'pattern_product.materialRu',
        'pattern_product.complexity',
        'pattern_product.discount',
        'images',
        'categories',
        'sizes.id',
        'sizes.size',
        'sizes.price',
        'sizes.vendorCode',

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
      .where('pattern_product.id = :id', { id })
      .getOne();
  }
  async findOneRuAuth(
    id: string,
    userId: number,
  ): Promise<PatternProductEntity> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.categories', 'categories')
      .leftJoin('pattern_product.sizes', 'sizes')
      .leftJoin('pattern_product.like', 'like')
      .leftJoin(
        'pattern_product.recommendationProduct',
        'recommendations',
        'like.userId = :userId',
        {
          userId,
        },
      )
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
        'pattern_product.id',
        'pattern_product.titleRu',
        'pattern_product.descriptionRu',
        'pattern_product.type',
        'pattern_product.modifier',
        'pattern_product.materialRu',
        'pattern_product.complexity',
        'pattern_product.discount',
        'images',
        'categories',
        'categories',
        'sizes.id',
        'sizes.size',
        'sizes.price',
        'sizes.vendorCode',
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
      ])
      .where('recommendations_sewing_product.deleted = false')
      .where('recommendations_master_class.deleted = false')
      .where('recommendations_pattern_product.deleted = false')
      .where('recommendations_post.deleted = false')
      .where('pattern_product.id = :id', { id })
      .getOne();
  }

  async findPinnedRu(): Promise<PatternProductEntity[]> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.sizes', 'sizes')
      .select([
        'pattern_product.id',
        'pattern_product.titleRu',
        'pattern_product.type',
        'pattern_product.modifier',
        'pattern_product.complexity',
        'pattern_product.discount',
        'pattern_product.pinned',
        'images',
        'sizes.id',
        'sizes.price',
      ])
      .where('pattern_product.deleted = false')
      .andWhere('pattern_product.pinned = true')
      .getMany();
  }
  async findPinnedRuAuth(userId: number): Promise<PatternProductEntity[]> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.like', 'like', 'like.userId = :userId', {
        userId,
      })
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.sizes', 'sizes')
      .select([
        'pattern_product.id',
        'pattern_product.titleRu',
        'pattern_product.type',
        'pattern_product.modifier',
        'pattern_product.complexity',
        'pattern_product.discount',
        'pattern_product.pinned',
        'images',
        'sizes.id',
        'sizes.price',
        'like',
      ])
      .where('pattern_product.deleted = false')
      .andWhere('pattern_product.pinned = true')
      .getMany();
  }

  async findLikedRu(userId: number): Promise<PatternProductEntity[]> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.sizes', 'sizes')
      .leftJoin('pattern_product.categories', 'categories')
      .leftJoin('pattern_product.like', 'like')
      .select([
        'pattern_product.id',
        'pattern_product.titleRu',
        'pattern_product.type',
        'pattern_product.modifier',
        'pattern_product.complexity',
        'pattern_product.discount',
        'images',
        'sizes',
        'categories',
        'like',
      ])
      .where('pattern_product.deleted = false')
      .andWhere('like.userId = :userId', { userId })
      .getMany();
  }

  async findOneEn(id: string): Promise<PatternProductEntity> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.categories', 'categories')
      .leftJoin('pattern_product.sizes', 'sizes')
      .select([
        'pattern_product.id',
        'pattern_product.titleEn',
        'pattern_product.descriptionEn',
        'pattern_product.type',
        'pattern_product.modifier',
        'pattern_product.materialEn',
        'pattern_product.complexity',
        'pattern_product.discount',
        'images',
        'categories',
        'sizes.id',
        'sizes.size',
        'sizes.price',
        'sizes.vendorCode',
      ])
      .where('pattern_product.id = :id', { id })
      .getOne();
  }
  async findAllEn(size: number, page: number): Promise<PatternProductEntity[]> {
    const take = size || 10;
    const skip = (page - 1) * size || 0;
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.sizes', 'sizes')
      .leftJoin('pattern_product.categories', 'categories')
      .leftJoin('pattern_product.like', 'like')
      .select([
        'pattern_product.id',
        'pattern_product.titleEn',
        'pattern_product.descriptionEn',
        'pattern_product.type',
        'pattern_product.modifier',
        'pattern_product.materialEn',
        'pattern_product.complexity',
        'pattern_product.discount',
        'like',
        'images',
        'sizes.id',
        'sizes.size',
        'sizes.price',
        'sizes.vendorCode',
        'categories',
      ])
      .where('pattern_product.deleted = false')
      .limit(take)
      .offset(skip)
      .getMany();
  }
  async findPinnedEn(): Promise<PatternProductEntity[]> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.sizes', 'sizes')
      .leftJoin('pattern_product.categories', 'categories')
      .leftJoin('pattern_product.like', 'like')
      .select([
        'pattern_product.id',
        'pattern_product.titleEn',
        'pattern_product.descriptionEn',
        'pattern_product.type',
        'pattern_product.modifier',
        'pattern_product.materialEn',
        'pattern_product.complexity',
        'pattern_product.discount',
        'pattern_product.pinned',
        'sizes.id',
        'sizes.size',
        'sizes.price',
        'sizes.vendorCode',
      ])
      .where('pattern_product.deleted = false')
      .where('pattern_product.pinned = true')
      .getMany();
  }
  async findOneEnAuth(
    id: string,
    userId: number,
  ): Promise<PatternProductEntity> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.comment', 'comment')
      .leftJoin('pattern_product.like', 'like')
      .where('like.userId = :userId', { userId })
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .select([
        'pattern_product.id',
        'like',
        'pattern_product.titleRu',
        'pattern_product.descriptionRu',
        'pattern_product.type',
        'pattern_product.modifier',
        'pattern_product.materialRu',
        'pattern_product.complexity',
        'pattern_product.discount',
        'comment',
        'userId.login',
        'subComment',
        'user.login',
      ])
      .where('pattern_product.id = :id', { id })
      .getOne();
  }
  async findAllEnAuth(
    size: number,
    page: number,
    userId: number,
  ): Promise<PatternProductEntity[]> {
    const take = size || 10;
    const skip = (page - 1) * size || 0;
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.comment', 'comment')
      .leftJoin('pattern_product.like', 'like')
      .where('like.userId = :userId', { userId })
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.sizes', 'sizes')
      .leftJoin('pattern_product.categories', 'categories')
      .select([
        'pattern_product.id',
        'like',
        'pattern_product.titleRu',
        'pattern_product.descriptionRu',
        'pattern_product.type',
        'pattern_product.modifier',
        'pattern_product.materialRu',
        'pattern_product.complexity',
        'pattern_product.discount',
        'comment',
        'userId.login',
        'subComment',
        'user.login',
        'images',
        'sizes',
        'categories',
      ])
      .where('pattern_product.deleted = false')
      .limit(take)
      .offset(skip)
      .getMany();
  }
  async findPinnedEnAuth(userId: number): Promise<PatternProductEntity[]> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.comment', 'comment')
      .leftJoin('pattern_product.like', 'like')
      .where('like.userId = :userId', { userId })
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .where('pattern_product.pinned = true')
      .select([
        'like',
        'pattern_product.id',
        'pattern_product.titleRu',
        'pattern_product.descriptionRu',
        'pattern_product.type',
        'pattern_product.modifier',
        'pattern_product.materialRu',
        'pattern_product.complexity',
        'pattern_product.discount',
        'comment',
        'userId.login',
        'subComment',
        'user.login',
      ])
      .getMany();
  }
  async findLikedEn(userId: number): Promise<PatternProductEntity[]> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.like', 'like')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.sizes', 'sizes')
      .leftJoin('pattern_product.categories', 'categories')
      .select([
        'pattern_product.id',
        'pattern_product.titleRu',
        'pattern_product.descriptionRu',
        'pattern_product.type',
        'pattern_product.modifier',
        'pattern_product.materialRu',
        'pattern_product.complexity',
        'pattern_product.discount',
        'like',
        'images',
        'sizes',
        'categories',
      ])
      .where('like.userId = :userId', { userId })
      .getMany();
  }
}
