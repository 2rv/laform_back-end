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
    category: string,
    allProductsPage: string,
  ): Promise<[PostEntity[], number]> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.image', 'image')
      .leftJoin('post.categories', 'categories')
      .select([
        'post.id',
        'post.type',
        'post.titleRu',
        'post.modifierRu',
        'post.pinned',
        'post.createdDate',
        'post.vendorCode',
        'post.deleted',
        'image',
        'categories.id',
        'categories.categoryNameRu',
      ])
      .orderBy(sort, by)
      .take(size)
      .skip((page - 1) * size || 0)
      .where(allProductsPage !== 'yes' && 'post.deleted = false')
      .andWhere(
        new Brackets((qb) => {
          if (where) {
            qb.where('post.titleRu ILIKE :search', {
              search: `%${where}%`,
            }).orWhere('categories.categoryNameRu ILIKE :search', {
              search: `%${where}%`,
            });
          } else if (category) {
            qb.where('categories.categoryNameRu = :category', {
              category: category,
            });
          } else {
            qb.where(allProductsPage !== 'yes' && 'post.deleted = false');
          }
        }),
      )
      .getManyAndCount();
  }
  async findAllEn(
    size: number = 30,
    page: number = 1,
    sort: string,
    by: any = 'ASC',
    where: string,
    category: string,
    allProductsPage: string,
  ): Promise<[PostEntity[], number]> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.image', 'image')
      .leftJoin('post.categories', 'categories')
      .select([
        'post.id',
        'post.type',
        'post.titleEn',
        'post.modifierEn',
        'post.pinned',
        'post.createdDate',
        'post.vendorCode',
        'post.deleted',
        'image',
        'categories.id',
        'categories.categoryNameEn',
      ])
      .orderBy(sort, by)
      .take(size)
      .skip((page - 1) * size || 0)
      .where(allProductsPage !== 'yes' && 'post.deleted = false')
      .andWhere(
        new Brackets((qb) => {
          if (where) {
            qb.where('post.titleEn ILIKE :search', {
              search: `%${where}%`,
            }).orWhere('categories.categoryNameEn ILIKE :search', {
              search: `%${where}%`,
            });
          } else if (category) {
            qb.where('categories.categoryNameRu = :category', {
              category: category,
            });
          } else {
            qb.where(allProductsPage !== 'yes' && 'post.deleted = false');
          }
        }),
      )
      .getManyAndCount();
  }
  async findAllRuAuth(
    size: number = 30,
    page: number = 1,
    sort: string,
    by: any = 'ASC',
    where: string,
    category: string,
    allProductsPage: string,
    userId: number,
  ): Promise<[PostEntity[], number]> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.image', 'image')
      .leftJoin('post.categories', 'categories')
      .leftJoin('post.like', 'like', 'like.userId = :userId', { userId })
      .select([
        'post.id',
        'post.type',
        'post.titleRu',
        'post.modifierRu',
        'post.pinned',
        'post.createdDate',
        'post.vendorCode',
        'post.deleted',
        'image',
        'categories.id',
        'categories.categoryNameRu',
        'like',
      ])
      .orderBy(sort, by)
      .take(size)
      .skip((page - 1) * size || 0)
      .where(allProductsPage !== 'yes' && 'post.deleted = false')
      .andWhere(
        new Brackets((qb) => {
          if (where) {
            qb.where('post.titleRu ILIKE :search', {
              search: `%${where}%`,
            }).orWhere('categories.categoryNameRu ILIKE :search', {
              search: `%${where}%`,
            });
          } else if (category) {
            qb.where('categories.categoryNameRu = :category', {
              category: category,
            });
          } else {
            qb.where(allProductsPage !== 'yes' && 'post.deleted = false');
          }
        }),
      )
      .getManyAndCount();
  }
  async findAllEnAuth(
    size: number = 30,
    page: number = 1,
    sort: string,
    by: any = 'ASC',
    where: string,
    category: string,
    allProductsPage: string,
    userId: number,
  ): Promise<[PostEntity[], number]> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.image', 'image')
      .leftJoin('post.categories', 'categories')
      .leftJoin('post.like', 'like', 'like.userId = :userId', { userId })
      .select([
        'post.id',
        'post.type',
        'post.titleEn',
        'post.modifierEn',
        'post.pinned',
        'post.createdDate',
        'post.vendorCode',
        'post.deleted',
        'image',
        'categories.id',
        'categories.categoryNameEn',
        'like',
      ])
      .orderBy(sort, by)
      .take(size)
      .skip((page - 1) * size || 0)
      .where(allProductsPage !== 'yes' && 'post.deleted = false')
      .andWhere(
        new Brackets((qb) => {
          if (where) {
            qb.where('post.titleEn ILIKE :search', {
              search: `%${where}%`,
            }).orWhere('categories.categoryNameEn ILIKE :search', {
              search: `%${where}%`,
            });
          } else if (category) {
            qb.where('categories.categoryNameRu = :category', {
              category: category,
            });
          } else {
            qb.where(allProductsPage !== 'yes' && 'post.deleted = false');
          }
        }),
      )
      .getManyAndCount();
  }

  async findOneRu(id: string): Promise<PostEntity> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.image', 'image')
      .leftJoin('post.categories', 'categories')
      .leftJoin('post.recommendation', 'recommendation')
      .leftJoin('recommendation.recommendationProducts', 'recommendations')

      .leftJoin('recommendations.masterClassId', 'rec_master_class')
      .leftJoin('recommendations.postId', 'rec_post')
      .leftJoin('recommendations.patternProductId', 'rec_pattern_product')
      .leftJoin('recommendations.sewingProductId', 'rec_sewing_product')

      .leftJoin('rec_master_class.images', 'rec_master_class_images')
      .leftJoin('rec_pattern_product.images', 'rec_pattern_product_images')
      .leftJoin('rec_sewing_product.images', 'rec_sewing_product_images')
      .leftJoin('rec_post.image', 'rec_post_image')

      .leftJoin('rec_pattern_product.options', 'rec_pattern_product_options')
      .leftJoin('rec_sewing_product.options', 'rec_sewing_product_options')

      .select([
        'post.id',
        'post.type',
        'post.titleRu',
        'post.modifierRu',
        'post.articleRu',
        'post.pinned',
        'post.createdDate',
        'post.vendorCode',
        'image',
        'categories.id',
        'categories.categoryNameRu',
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

      .leftJoin('recommendations.masterClassId', 'rec_master_class')
      .leftJoin('recommendations.postId', 'rec_post')
      .leftJoin('recommendations.patternProductId', 'rec_pattern_product')
      .leftJoin('recommendations.sewingProductId', 'rec_sewing_product')

      .leftJoin('rec_master_class.images', 'rec_master_class_images')
      .leftJoin('rec_pattern_product.images', 'rec_pattern_product_images')
      .leftJoin('rec_sewing_product.images', 'rec_sewing_product_images')
      .leftJoin('rec_post.image', 'rec_post_image')

      .leftJoin('rec_pattern_product.options', 'rec_pattern_product_options')
      .leftJoin('rec_sewing_product.options', 'rec_sewing_product_options')
      .select([
        'post.id',
        'post.type',
        'post.titleEn',
        'post.modifierEn',
        'post.articleEn',
        'post.pinned',
        'post.createdDate',
        'post.vendorCode',
        'image',
        'categories.id',
        'categories.categoryNameEn',
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
      .leftJoin('recommendations.masterClassId', 'rec_master_class')
      .leftJoin('recommendations.postId', 'rec_post')
      .leftJoin('recommendations.patternProductId', 'rec_pattern_product')
      .leftJoin('recommendations.sewingProductId', 'rec_sewing_product')

      .leftJoin('rec_master_class.images', 'rec_master_class_images')
      .leftJoin('rec_pattern_product.images', 'rec_pattern_product_images')
      .leftJoin('rec_sewing_product.images', 'rec_sewing_product_images')
      .leftJoin('rec_post.image', 'rec_post_image')

      .leftJoin('rec_pattern_product.options', 'rec_pattern_product_options')
      .leftJoin('rec_sewing_product.options', 'rec_sewing_product_options')

      .leftJoin(
        'rec_master_class.like',
        'rec_master_class_like',
        'rec_master_class_like.userId = :userId',
        {
          userId,
        },
      )
      .leftJoin(
        'rec_pattern_product.like',
        'rec_pattern_product_like',
        'rec_pattern_product_like.userId = :userId',
        {
          userId,
        },
      )
      .leftJoin(
        'rec_sewing_product.like',
        'rec_sewing_product_like',
        'rec_sewing_product_like.userId = :userId',
        {
          userId,
        },
      )
      .leftJoin(
        'rec_post.like',
        'rec_post_like',
        'rec_post_like.userId = :userId',
        {
          userId,
        },
      )
      .select([
        'post.id',
        'post.type',
        'post.titleRu',
        'post.modifierRu',
        'post.articleRu',
        'post.pinned',
        'post.createdDate',
        'post.vendorCode',
        'image',
        'categories.id',
        'categories.categoryNameRu',
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
      .leftJoin('recommendations.masterClassId', 'rec_master_class')
      .leftJoin('recommendations.postId', 'rec_post')
      .leftJoin('recommendations.patternProductId', 'rec_pattern_product')
      .leftJoin('recommendations.sewingProductId', 'rec_sewing_product')

      .leftJoin('rec_master_class.images', 'rec_master_class_images')
      .leftJoin('rec_pattern_product.images', 'rec_pattern_product_images')
      .leftJoin('rec_sewing_product.images', 'rec_sewing_product_images')
      .leftJoin('rec_post.image', 'rec_post_image')

      .leftJoin('rec_pattern_product.options', 'rec_pattern_product_options')
      .leftJoin('rec_sewing_product.options', 'rec_sewing_product_options')

      .leftJoin(
        'rec_master_class.like',
        'rec_master_class_like',
        'rec_master_class_like.userId = :userId',
        {
          userId,
        },
      )
      .leftJoin(
        'rec_pattern_product.like',
        'rec_pattern_product_like',
        'rec_pattern_product_like.userId = :userId',
        {
          userId,
        },
      )
      .leftJoin(
        'rec_sewing_product.like',
        'rec_sewing_product_like',
        'rec_sewing_product_like.userId = :userId',
        {
          userId,
        },
      )
      .leftJoin(
        'rec_post.like',
        'rec_post_like',
        'rec_post_like.userId = :userId',
        {
          userId,
        },
      )

      .select([
        'post.id',
        'post.type',
        'post.titleEn',
        'post.modifierEn',
        'post.articleEn',
        'post.pinned',
        'post.createdDate',
        'post.vendorCode',
        'image',
        'categories.id',
        'categories.categoryNameEn',
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
        'post.type',
        'post.titleRu',
        'post.modifierRu',
        'post.pinned',
        'post.createdDate',
        'post.vendorCode',
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
        'post.type',
        'post.titleEn',
        'post.modifierEn',
        'post.pinned',
        'post.createdDate',
        'post.vendorCode',
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
        'post.type',
        'post.titleRu',
        'post.modifierRu',
        'post.pinned',
        'post.createdDate',
        'post.vendorCode',
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
        'post.type',
        'post.titleEn',
        'post.modifierEn',
        'post.pinned',
        'post.createdDate',
        'post.vendorCode',
        'image',
        'categories.id',
        'categories.categoryNameEn',
        'like',
      ])
      .where('post.pinned = true')
      .getMany();
  }

  async findLikedRu(
    userId: number,
    size: number = 30,
    page: number = 1,
  ): Promise<[PostEntity[], number]> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.image', 'image')
      .leftJoin('post.categories', 'categories')
      .leftJoin('post.like', 'like')
      .select([
        'post.id',
        'post.type',
        'post.titleRu',
        'post.modifierRu',
        'post.pinned',
        'post.createdDate',
        'post.vendorCode',
        'image',
        'categories.id',
        'categories.categoryNameRu',
        'like',
      ])
      .take(size)
      .skip((page - 1) * size || 0)
      .where('post.deleted = false')
      .andWhere('like.userId = :userId', { userId })
      .getManyAndCount();
  }
  async findLikedEn(
    userId: number,
    size: number = 30,
    page: number = 1,
  ): Promise<[PostEntity[], number]> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.image', 'image')
      .leftJoin('post.categories', 'categories')
      .leftJoin('post.like', 'like')
      .select([
        'post.id',
        'post.type',
        'post.titleEn',
        'post.modifierEn',
        'post.pinned',
        'post.createdDate',
        'post.vendorCode',
        'image',
        'categories.id',
        'categories.categoryNameEn',
        'like',
      ])
      .take(size)
      .skip((page - 1) * size || 0)
      .where('post.deleted = false')
      .andWhere('like.userId = :userId', { userId })
      .getManyAndCount();
  }
}
