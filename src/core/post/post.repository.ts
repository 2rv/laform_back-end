import { PostEntity } from './post.entity';
import { Brackets, EntityRepository, Repository } from 'typeorm';
import {
  recommendationsEn,
  recommendationsEnAuth,
  recommendationsRu,
  recommendationsRuAuth,
} from '../recommendation/recommendation.select';

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
  async findAllRu(
    size: number = 30,
    page: number = 1,
    sort: string,
    by: any = 'ASC',
    where: string,
  ): Promise<PostEntity[]> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.image', 'image')
      .leftJoin('post.categories', 'categories')
      .select([
        'post.id',
        'post.titleRu',
        'post.createdDate',
        'post.modifierRu',
        'post.type',
        'post.pinned',
        'image',
        'categories.id',
        'categories.categoryNameRu',
      ])
      .orderBy(sort, by)
      //   .take(size)
      //   .skip(page > 0 ? page - 1 : 0)
      .where('post.deleted = false')
      .andWhere(
        new Brackets((qb) => {
          if (where) {
            qb.where('post.titleRu ILIKE :search', {
              search: `%${where}%`,
            }).orWhere('categories.textRu ILIKE :search', {
              search: `%${where}%`,
            });
          } else {
            qb.where('post.deleted = false');
          }
        }),
      )
      //   .getManyAndCount();
      .getMany();
  }
  async findAllEn(
    size: number = 30,
    page: number = 1,
    sort: string,
    by: any = 'ASC',
    where: string,
  ): Promise<PostEntity[]> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.image', 'image')
      .leftJoin('post.categories', 'categories')
      .select([
        'post.id',
        'post.titleEn',
        'post.createdDate',
        'post.modifierEn',
        'post.type',
        'post.pinned',
        'image',
        'categories.id',
        'categories.categoryNameEn',
      ])
      .orderBy(sort, by)
      //   .take(size)
      //   .skip(page > 0 ? page - 1 : 0)
      .where('post.deleted = false')
      .andWhere(
        new Brackets((qb) => {
          if (where) {
            qb.where('post.titleEn ILIKE :search', {
              search: `%${where}%`,
            }).orWhere('categories.textEn ILIKE :search', {
              search: `%${where}%`,
            });
          } else {
            qb.where('post.deleted = false');
          }
        }),
      )
      //   .getManyAndCount();
      .getMany();
  }
  async findAllRuAuth(
    size: number = 30,
    page: number = 1,
    sort: string,
    by: any = 'ASC',
    where: string,
    userId: number,
  ): Promise<PostEntity[]> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.image', 'image')
      .leftJoin('post.categories', 'categories')
      .leftJoin('post.like', 'like', 'like.userId = :userId', { userId })
      .select([
        'post.id',
        'post.titleRu',
        'post.createdDate',
        'post.modifierRu',
        'post.type',
        'post.pinned',
        'image',
        'categories.id',
        'categories.categoryNameRu',
        'like',
      ])
      .orderBy(sort, by)
      //   .take(size)
      //   .skip(page > 0 ? page - 1 : 0)
      .where('post.deleted = false')
      .andWhere(
        new Brackets((qb) => {
          if (where) {
            qb.where('post.titleRu ILIKE :search', {
              search: `%${where}%`,
            }).orWhere('categories.textRu ILIKE :search', {
              search: `%${where}%`,
            });
          } else {
            qb.where('post.deleted = false');
          }
        }),
      )
      //   .getManyAndCount();
      .getMany();
  }
  async findAllEnAuth(
    size: number = 30,
    page: number = 1,
    sort: string,
    by: any = 'ASC',
    where: string,
    userId: number,
  ): Promise<PostEntity[]> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.image', 'image')
      .leftJoin('post.categories', 'categories')
      .leftJoin('post.like', 'like', 'like.userId = :userId', { userId })
      .select([
        'post.id',
        'post.titleEn',
        'post.createdDate',
        'post.modifierEn',
        'post.type',
        'post.pinned',
        'image',
        'categories.id',
        'categories.categoryNameEn',
        'like',
      ])
      .orderBy(sort, by)
      //   .take(size)
      //   .skip(page > 0 ? page - 1 : 0)
      .where('post.deleted = false')
      .andWhere(
        new Brackets((qb) => {
          if (where) {
            qb.where('post.titleEn ILIKE :search', {
              search: `%${where}%`,
            }).orWhere('categories.textEn ILIKE :search', {
              search: `%${where}%`,
            });
          } else {
            qb.where('post.deleted = false');
          }
        }),
      )
      //   .getManyAndCount();
      .getMany();
  }

  async findOneRu(id: string): Promise<PostEntity> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.image', 'image')
      .leftJoin('post.categories', 'categories')
      .leftJoin('post.recommendation', 'recommendation')
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
      .leftJoin(
        'recommendations_sewing_product.colors',
        'recommendations_sewing_product_colors',
      )
      .leftJoin('recommendations.postId', 'recommendations_post')
      .leftJoin('recommendations_post.image', 'recommendations_post_image')
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

        ...recommendationsRu,
      ])
      .where('recommendations_sewing_product.deleted = false')
      .where('recommendations_master_class.deleted = false')
      .where('recommendations_pattern_product.deleted = false')
      .where('recommendations_post.deleted = false')
      .where('post.id = :id', { id })
      .getOne();
  }
  async findOneEn(id: string): Promise<PostEntity> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.image', 'image')
      .leftJoin('post.categories', 'categories')
      .leftJoin('post.recommendation', 'recommendation')
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
      .leftJoin(
        'recommendations_sewing_product.colors',
        'recommendations_sewing_product_colors',
      )
      .leftJoin('recommendations.postId', 'recommendations_post')
      .leftJoin('recommendations_post.image', 'recommendations_post_image')
      .select([
        'post.id',
        'post.titleEn',
        'post.createdDate',
        'post.articleText',
        'post.likeCount',
        'post.modifier',
        'post.type',
        'image',
        'categories',
        ...recommendationsEn,
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
      .leftJoin('post.recommendation', 'recommendation')
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
        'recommendations_sewing_product.colors',
        'recommendations_sewing_product_colors',
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

        ...recommendationsRuAuth,
      ])
      .where('recommendations_sewing_product.deleted = false')
      .where('recommendations_master_class.deleted = false')
      .where('recommendations_pattern_product.deleted = false')
      .where('recommendations_post.deleted = false')
      .where('post.id = :id', { id })
      .getOne();
  }
  async findOneEnAuth(id: string, userId: number): Promise<PostEntity> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.image', 'image')
      .leftJoin('post.categories', 'categories')
      .leftJoin('post.like', 'like', 'like.userId = :userId', { userId })
      .leftJoin('post.recommendation', 'recommendation')
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
        'recommendations_sewing_product.colors',
        'recommendations_sewing_product_colors',
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
        'post.titleEn',
        'post.createdDate',
        'post.likeCount',
        'post.modifier',
        'post.type',
        'image',
        'categories',
        'like',

        ...recommendationsEnAuth,
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
        'post.createdDate',
        'post.modifierRu',
        'post.type',
        'post.pinned',
        'image',
        'categories.id',
        'categories.categoryNameRu',
      ])
      .where('post.pinned = true')
      .getMany();
  }
  async findPinnedEn(): Promise<PostEntity[]> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.image', 'image')
      .leftJoin('post.categories', 'categories')
      .select([
        'post.id',
        'post.titleEn',
        'post.createdDate',
        'post.modifierEn',
        'post.type',
        'post.pinned',
        'image',
        'categories.id',
        'categories.categoryNameEn',
      ])
      .where('post.pinned = true')
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
        'post.createdDate',
        'post.modifierRu',
        'post.type',
        'post.pinned',
        'image',
        'categories.id',
        'categories.categoryNameRu',
        'like',
      ])
      .where('post.pinned = true')
      .getMany();
  }
  async findPinnedEnAuth(userId: number): Promise<PostEntity[]> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.image', 'image')
      .leftJoin('post.categories', 'categories')
      .leftJoin('post.like', 'like', 'like.userId = :userId', { userId })
      .select([
        'post.id',
        'post.titleEn',
        'post.createdDate',
        'post.modifierEn',
        'post.type',
        'post.pinned',
        'image',
        'categories.id',
        'categories.categoryNameEn',
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
        'post.modifierRu',
        'post.type',
        'post.pinned',
        'image',
        'categories.id',
        'categories.categoryNameRu',
        'like',
      ])
      .where('post.deleted = false')
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
        'post.modifierEn',
        'post.type',
        'post.pinned',
        'image',
        'categories.id',
        'categories.categoryNameEn',
        'like',
      ])
      .where('post.deleted = false')
      .andWhere('like.userId = :userId', { userId })
      .getMany();
  }
}
