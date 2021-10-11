import { SewingProductEntity } from './sewing-product.entity';
import { Brackets, EntityRepository, Repository } from 'typeorm';
import {
  recommendationsEn,
  recommendationsEnAuth,
  recommendationsRu,
  recommendationsRuAuth,
} from '../recommendation/recommendation.select';

@EntityRepository(SewingProductEntity)
export class SewingProductRepository extends Repository<SewingProductEntity> {
  async findAllRu(
    size: number = 30,
    page: number = 1,
    sort: string,
    by: any = 'ASC',
    where: string,
  ): Promise<SewingProductEntity[]> {
    return await this.createQueryBuilder('sewing_product')
      .leftJoin('sewing_product.images', 'images')
      .leftJoin('sewing_product.categories', 'categories')
      .leftJoin('sewing_product.options', 'options')
      .select([
        'sewing_product.id',
        'sewing_product.titleRu',
        'sewing_product.modifierRu',
        'sewing_product.type',
        'sewing_product.pinned',
        'sewing_product.price',
        'sewing_product.discount',
        'sewing_product.optionType',
        'images',
        'categories.id',
        'categories.categoryNameRu',
        'options.id',
        'options.size',
        'options.colorRu',
        'options.price',
        'options.discount',
        'options.vendorCode',
      ])
      .orderBy(sort, by)
      //   .take(size)
      //   .skip(page > 0 ? page - 1 : 0)
      .where('sewing_product.deleted = false')
      .andWhere(
        new Brackets((qb) => {
          if (where) {
            qb.where('sewing_product.titleRu ILIKE :search', {
              search: `%${where}%`,
            }).orWhere('categories.categoryNameRu ILIKE :search', {
              search: `%${where}%`,
            });
          } else {
            qb.where('sewing_product.deleted = false');
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
  ): Promise<SewingProductEntity[]> {
    return await this.createQueryBuilder('sewing_product')
      .leftJoin('sewing_product.images', 'images')
      .leftJoin('sewing_product.categories', 'categories')
      .leftJoin('sewing_product.options', 'options')
      .select([
        'sewing_product.id',
        'sewing_product.titleEn',
        'sewing_product.modifierEn',
        'sewing_product.type',
        'sewing_product.pinned',
        'sewing_product.price',
        'sewing_product.discount',
        'sewing_product.optionType',
        'images',
        'categories.id',
        'categories.categoryNameEn',
        'options.id',
        'options.size',
        'options.colorEn',
        'options.price',
        'options.discount',
        'options.vendorCode',
      ])
      .orderBy(sort, by)
      //   .take(size)
      //   .skip(page > 0 ? page - 1 : 0)
      .where('sewing_product.deleted = false')
      .andWhere(
        new Brackets((qb) => {
          if (where) {
            qb.where('sewing_product.titleEn ILIKE :search', {
              search: `%${where}%`,
            }).orWhere('categories.categoryNameEn ILIKE :search', {
              search: `%${where}%`,
            });
          } else {
            qb.where('sewing_product.deleted = false');
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
  ): Promise<SewingProductEntity[]> {
    return await this.createQueryBuilder('sewing_product')
      .leftJoin('sewing_product.images', 'images')
      .leftJoin('sewing_product.categories', 'categories')
      .leftJoin('sewing_product.options', 'options')
      .leftJoin('sewing_product.like', 'like', 'like.userId = :userId', {
        userId,
      })
      .select([
        'sewing_product.id',
        'sewing_product.titleRu',
        'sewing_product.modifierRu',
        'sewing_product.type',
        'sewing_product.pinned',
        'sewing_product.price',
        'sewing_product.discount',
        'sewing_product.optionType',
        'images',
        'categories.id',
        'categories.categoryNameRu',
        'options.id',
        'options.size',
        'options.colorRu',
        'options.price',
        'options.discount',
        'options.vendorCode',
        'like',
      ])
      .orderBy(sort, by)
      //   .take(size)
      //   .skip(page > 0 ? page - 1 : 0)
      .where('sewing_product.deleted = false')
      .andWhere(
        new Brackets((qb) => {
          if (where) {
            qb.where('sewing_product.titleRu ILIKE :search', {
              search: `%${where}%`,
            }).orWhere('categories.categoryNameRu ILIKE :search', {
              search: `%${where}%`,
            });
          } else {
            qb.where('sewing_product.deleted = false');
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
  ): Promise<SewingProductEntity[]> {
    return await this.createQueryBuilder('sewing_product')
      .leftJoin('sewing_product.images', 'images')
      .leftJoin('sewing_product.categories', 'categories')
      .leftJoin('sewing_product.options', 'options')
      .leftJoin('sewing_product.like', 'like', 'like.userId = :userId', {
        userId,
      })
      .select([
        'sewing_product.id',
        'sewing_product.titleEn',
        'sewing_product.modifierEn',
        'sewing_product.type',
        'sewing_product.pinned',
        'sewing_product.price',
        'sewing_product.discount',
        'sewing_product.optionType',
        'images',
        'categories.id',
        'categories.categoryNameEn',
        'options.id',
        'options.size',
        'options.colorEn',
        'options.price',
        'options.discount',
        'options.vendorCode',
        'like',
      ])
      .orderBy(sort, by)
      //   .take(size)
      //   .skip(page > 0 ? page - 1 : 0)
      .where('sewing_product.deleted = false')
      .andWhere(
        new Brackets((qb) => {
          if (where) {
            qb.where('sewing_product.titleEn ILIKE :search', {
              search: `%${where}%`,
            }).orWhere('categories.categoryNameEn ILIKE :search', {
              search: `%${where}%`,
            });
          } else {
            qb.where('sewing_product.deleted = false');
          }
        }),
      )
      //   .getManyAndCount();
      .getMany();
  }

  async findOneRu(id: string): Promise<SewingProductEntity> {
    return await this.createQueryBuilder('sewing_product')
      .leftJoin('sewing_product.images', 'images')
      .leftJoin('sewing_product.categories', 'categories')
      .leftJoin('sewing_product.colors', 'colors')
      .leftJoin('sewing_product.sizes', 'sizes')
      .leftJoin('sewing_product.recommendation', 'recommendation')
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
        'sewing_product.id',
        'sewing_product.titleRu',
        'sewing_product.descriptionRu',
        'sewing_product.modifier',
        'sewing_product.type',
        'images',
        'categories',
        'colors',
        'sizes.id',
        'sizes.vendorCode',
        'sizes.size',
        'sizes.price',

        ...recommendationsRu,
      ])
      .where('recommendations_sewing_product.deleted = false')
      .where('recommendations_master_class.deleted = false')
      .where('recommendations_pattern_product.deleted = false')
      .where('recommendations_post.deleted = false')
      .where('sewing_product.id = :id', { id })
      .getOne();
  }
  async findOneEn(id: string): Promise<SewingProductEntity> {
    return await this.createQueryBuilder('sewing_product')
      .leftJoin('sewing_product.images', 'images')
      .leftJoin('sewing_product.categories', 'categories')
      .leftJoin('sewing_product.colors', 'colors')
      .leftJoin('sewing_product.sizes', 'sizes')
      .leftJoin('sewing_product.recommendation', 'recommendation')
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
        'sewing_product.id',
        'sewing_product.titleEn',
        'sewing_product.descriptionEn',
        'sewing_product.modifier',
        'sewing_product.type',
        'images',
        'categories',
        'colors',
        'sizes.id',
        'sizes.vendorCode',
        'sizes.size',
        'sizes.price',

        ...recommendationsEn,
      ])
      .where('recommendations_sewing_product.deleted = false')
      .where('recommendations_master_class.deleted = false')
      .where('recommendations_pattern_product.deleted = false')
      .where('recommendations_post.deleted = false')
      .where('sewing_product.id = :id', { id })
      .getOne();
  }
  async findOneRuAuth(
    id: string,
    userId: number,
  ): Promise<SewingProductEntity> {
    return await this.createQueryBuilder('sewing_product')
      .leftJoin('sewing_product.images', 'images')
      .leftJoin('sewing_product.categories', 'categories')
      .leftJoin('sewing_product.colors', 'colors')
      .leftJoin('sewing_product.sizes', 'sizes')
      .leftJoin('sewing_product.like', 'like', 'like.userId = :userId', {
        userId,
      })
      .leftJoin('sewing_product.recommendation', 'recommendation')
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
        'sewing_product.id',
        'sewing_product.titleRu',
        'sewing_product.descriptionRu',
        'sewing_product.modifier',
        'sewing_product.type',
        'images',
        'categories',
        'colors',
        'sizes.id',
        'sizes.vendorCode',
        'sizes.size',
        'sizes.price',
        'like',

        ...recommendationsRuAuth,
      ])
      .where('recommendations_sewing_product.deleted = false')
      .where('recommendations_master_class.deleted = false')
      .where('recommendations_pattern_product.deleted = false')
      .where('recommendations_post.deleted = false')
      .where('sewing_product.id = :id', { id })
      .getOne();
  }
  async findOneEnAuth(
    id: string,
    userId: number,
  ): Promise<SewingProductEntity> {
    return await this.createQueryBuilder('sewing_product')
      .leftJoin('sewing_product.images', 'images')
      .leftJoin('sewing_product.categories', 'categories')
      .leftJoin('sewing_product.colors', 'colors')
      .leftJoin('sewing_product.sizes', 'sizes')
      .leftJoin('sewing_product.like', 'like', 'like.userId = :userId', {
        userId,
      })
      .leftJoin('sewing_product.recommendation', 'recommendation')
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
        'sewing_product.id',
        'sewing_product.titleEn',
        'sewing_product.descriptionEn',
        'sewing_product.modifier',
        'sewing_product.type',
        'images',
        'categories',
        'colors',
        'sizes.id',
        'sizes.vendorCode',
        'sizes.size',
        'sizes.price',
        'like',

        ...recommendationsEnAuth,
      ])
      .where('recommendations_sewing_product.deleted = false')
      .where('recommendations_master_class.deleted = false')
      .where('recommendations_pattern_product.deleted = false')
      .where('recommendations_post.deleted = false')
      .where('sewing_product.id = :id', { id })
      .getOne();
  }

  async findPinnedRu(): Promise<SewingProductEntity[]> {
    return await this.createQueryBuilder('sewing_product')
      .leftJoin('sewing_product.images', 'images')
      .leftJoin('sewing_product.categories', 'categories')
      .leftJoin('sewing_product.options', 'options')
      .select([
        'sewing_product.id',
        'sewing_product.titleRu',
        'sewing_product.modifierRu',
        'sewing_product.type',
        'sewing_product.pinned',
        'sewing_product.price',
        'sewing_product.discount',
        'sewing_product.optionType',
        'images',
        'categories.id',
        'categories.categoryNameRu',
        'options.id',
        'options.size',
        'options.colorRu',
        'options.price',
        'options.discount',
        'options.vendorCode',
      ])
      .where('sewing_product.pinned = true')
      .andWhere('sewing_product.deleted = false')
      .getMany();
  }
  async findPinnedEn(): Promise<SewingProductEntity[]> {
    return await this.createQueryBuilder('sewing_product')
      .leftJoin('sewing_product.images', 'images')
      .leftJoin('sewing_product.categories', 'categories')
      .leftJoin('sewing_product.options', 'options')
      .select([
        'sewing_product.id',
        'sewing_product.titleEn',
        'sewing_product.modifierEn',
        'sewing_product.type',
        'sewing_product.pinned',
        'sewing_product.price',
        'sewing_product.discount',
        'sewing_product.optionType',
        'images',
        'categories.id',
        'categories.categoryNameEn',
        'options.id',
        'options.size',
        'options.colorEn',
        'options.price',
        'options.discount',
        'options.vendorCode',
      ])
      .where('sewing_product.pinned = true')
      .andWhere('sewing_product.deleted = false')
      .getMany();
  }
  async findPinnedRuAuth(userId: number): Promise<SewingProductEntity[]> {
    return await this.createQueryBuilder('sewing_product')
      .leftJoin('sewing_product.images', 'images')
      .leftJoin('sewing_product.categories', 'categories')
      .leftJoin('sewing_product.options', 'options')
      .leftJoin('sewing_product.like', 'like', 'like.userId = :userId', {
        userId,
      })
      .select([
        'sewing_product.id',
        'sewing_product.titleRu',
        'sewing_product.modifierRu',
        'sewing_product.type',
        'sewing_product.pinned',
        'sewing_product.price',
        'sewing_product.discount',
        'sewing_product.optionType',
        'images',
        'categories.id',
        'categories.categoryNameRu',
        'options.id',
        'options.size',
        'options.colorRu',
        'options.price',
        'options.discount',
        'options.vendorCode',
        'like',
      ])
      .where('sewing_product.pinned = true')
      .andWhere('sewing_product.deleted = false')
      .getMany();
  }
  async findPinnedEnAuth(userId: number): Promise<SewingProductEntity[]> {
    return await this.createQueryBuilder('sewing_product')
      .leftJoin('sewing_product.images', 'images')
      .leftJoin('sewing_product.categories', 'categories')
      .leftJoin('sewing_product.options', 'options')
      .leftJoin('sewing_product.like', 'like', 'like.userId = :userId', {
        userId,
      })
      .select([
        'sewing_product.id',
        'sewing_product.titleEn',
        'sewing_product.modifierEn',
        'sewing_product.type',
        'sewing_product.pinned',
        'sewing_product.price',
        'sewing_product.discount',
        'sewing_product.optionType',
        'images',
        'categories.id',
        'categories.categoryNameEn',
        'options.id',
        'options.size',
        'options.colorEn',
        'options.price',
        'options.discount',
        'options.vendorCode',
        'like',
      ])
      .where('sewing_product.pinned = true')
      .andWhere('sewing_product.deleted = false')
      .getMany();
  }

  async findLikedRu(userId: number): Promise<SewingProductEntity[]> {
    return await this.createQueryBuilder('sewing_product')
      .leftJoin('sewing_product.images', 'images')
      .leftJoin('sewing_product.categories', 'categories')
      .leftJoin('sewing_product.options', 'options')
      .leftJoin('sewing_product.like', 'like')
      .select([
        'sewing_product.id',
        'sewing_product.titleRu',
        'sewing_product.modifierRu',
        'sewing_product.type',
        'sewing_product.pinned',
        'sewing_product.price',
        'sewing_product.discount',
        'sewing_product.optionType',
        'images',
        'categories.id',
        'categories.categoryNameRu',
        'options.id',
        'options.size',
        'options.colorRu',
        'options.price',
        'options.discount',
        'options.vendorCode',
        'like',
      ])
      .where('sewing_product.deleted = false')
      .andWhere('like.userId = :userId', { userId })
      .getMany();
  }
  async findLikedEn(userId: number): Promise<SewingProductEntity[]> {
    return await this.createQueryBuilder('sewing_product')
      .leftJoin('sewing_product.images', 'images')
      .leftJoin('sewing_product.categories', 'categories')
      .leftJoin('sewing_product.options', 'options')
      .leftJoin('sewing_product.like', 'like')
      .select([
        'sewing_product.id',
        'sewing_product.titleEn',
        'sewing_product.modifierEn',
        'sewing_product.type',
        'sewing_product.pinned',
        'sewing_product.price',
        'sewing_product.discount',
        'sewing_product.optionType',
        'images',
        'categories.id',
        'categories.categoryNameEn',
        'options.id',
        'options.size',
        'options.colorEn',
        'options.price',
        'options.discount',
        'options.vendorCode',
        'like',
      ])
      .where('sewing_product.deleted = false')
      .andWhere('like.userId = :userId', { userId })
      .getMany();
  }
}
