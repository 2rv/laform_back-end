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
    category: string,
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
        'sewing_product.count',
        'sewing_product.length',
        'images',
        'categories.id',
        'categories.categoryNameRu',
        'options.id',
        'options.size',
        'options.colorRu',
        'options.price',
        'options.count',
        'options.length',
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
          } else if (category) {
            qb.where('categories.categoryNameRu = :category', {
              category: category,
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
    category: string,
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
        'sewing_product.count',
        'sewing_product.length',
        'images',
        'categories.id',
        'categories.categoryNameEn',
        'options.id',
        'options.size',
        'options.colorEn',
        'options.price',
        'options.count',
        'options.length',
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
          } else if (category) {
            qb.where('categories.categoryNameRu = :category', {
              category: category,
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
    category: string,
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
        'sewing_product.count',
        'sewing_product.length',
        'images',
        'categories.id',
        'categories.categoryNameRu',
        'options.id',
        'options.size',
        'options.colorRu',
        'options.price',
        'options.count',
        'options.length',
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
          } else if (category) {
            qb.where('categories.categoryNameRu = :category', {
              category: category,
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
    category: string,
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
        'sewing_product.count',
        'sewing_product.length',
        'images',
        'categories.id',
        'categories.categoryNameEn',
        'options.id',
        'options.size',
        'options.colorEn',
        'options.price',
        'options.count',
        'options.length',
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
          } else if (category) {
            qb.where('categories.categoryNameRu = :category', {
              category: category,
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
      .leftJoin('sewing_product.options', 'options')
      .leftJoin('sewing_product.recommendation', 'recommendation')
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
        'sewing_product.id',
        'sewing_product.type',
        'sewing_product.optionType',
        'sewing_product.titleRu',
        'sewing_product.descriptionRu',
        'sewing_product.modifierRu',
        'sewing_product.discount',
        'sewing_product.price',
        'sewing_product.count',
        'sewing_product.length',
        'sewing_product.vendorCode',
        'images',
        'categories',
        'options.id',
        'options.vendorCode',
        'options.colorRu',
        'options.size',
        'options.price',
        'options.discount',
        'options.count',
        'options.length',
        ...recommendationsRu,
      ])
      .where('rec_sewing_product.deleted = false')
      .where('rec_master_class.deleted = false')
      .where('rec_pattern_product.deleted = false')
      .where('rec_post.deleted = false')
      .where('sewing_product.id = :id', { id })
      .andWhere('sewing_product.deleted = false')
      .getOne();
  }
  async findOneEn(id: string): Promise<SewingProductEntity> {
    return await this.createQueryBuilder('sewing_product')
      .leftJoin('sewing_product.images', 'images')
      .leftJoin('sewing_product.categories', 'categories')
      .leftJoin('sewing_product.options', 'options')
      .leftJoin('sewing_product.recommendation', 'recommendation')
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
        'sewing_product.id',
        'sewing_product.type',
        'sewing_product.optionType',
        'sewing_product.titleEn',
        'sewing_product.descriptionEn',
        'sewing_product.modifierEn',
        'sewing_product.discount',
        'sewing_product.price',
        'sewing_product.count',
        'sewing_product.length',
        'sewing_product.vendorCode',
        'images',
        'categories',
        'options.id',
        'options.vendorCode',
        'options.colorEn',
        'options.size',
        'options.price',
        'options.discount',
        'options.count',
        'options.length',
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
      .leftJoin('sewing_product.options', 'options')
      .leftJoin('sewing_product.like', 'like', 'like.userId = :userId', {
        userId,
      })
      .leftJoin('sewing_product.recommendation', 'recommendation')
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
        'sewing_product.id',
        'sewing_product.type',
        'sewing_product.optionType',
        'sewing_product.titleRu',
        'sewing_product.descriptionRu',
        'sewing_product.modifierRu',
        'sewing_product.discount',
        'sewing_product.price',
        'sewing_product.count',
        'sewing_product.length',
        'sewing_product.vendorCode',
        'images',
        'categories',
        'options.id',
        'options.vendorCode',
        'options.colorRu',
        'options.size',
        'options.price',
        'options.discount',
        'options.count',
        'options.length',
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
      .leftJoin('sewing_product.options', 'options')
      .leftJoin('sewing_product.like', 'like', 'like.userId = :userId', {
        userId,
      })
      .leftJoin('sewing_product.recommendation', 'recommendation')
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
        'sewing_product.id',
        'sewing_product.type',
        'sewing_product.optionType',
        'sewing_product.titleEn',
        'sewing_product.descriptionEn',
        'sewing_product.modifierEn',
        'sewing_product.discount',
        'sewing_product.price',
        'sewing_product.count',
        'sewing_product.length',
        'sewing_product.vendorCode',
        'images',
        'categories',
        'options.id',
        'options.vendorCode',
        'options.colorEn',
        'options.size',
        'options.price',
        'options.discount',
        'options.count',
        'options.length',
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
        'sewing_product.count',
        'sewing_product.length',
        'images',
        'categories.id',
        'categories.categoryNameRu',
        'options.id',
        'options.size',
        'options.colorRu',
        'options.price',
        'options.count',
        'options.length',
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
        'sewing_product.count',
        'sewing_product.length',
        'images',
        'categories.id',
        'categories.categoryNameEn',
        'options.id',
        'options.size',
        'options.colorEn',
        'options.price',
        'options.count',
        'options.length',
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
        'sewing_product.count',
        'sewing_product.length',
        'images',
        'categories.id',
        'categories.categoryNameRu',
        'options.id',
        'options.size',
        'options.colorRu',
        'options.price',
        'options.count',
        'options.length',
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
        'sewing_product.count',
        'sewing_product.length',
        'images',
        'categories.id',
        'categories.categoryNameEn',
        'options.id',
        'options.size',
        'options.colorEn',
        'options.price',
        'options.count',
        'options.length',
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
        'sewing_product.count',
        'sewing_product.length',
        'images',
        'categories.id',
        'categories.categoryNameRu',
        'options.id',
        'options.size',
        'options.colorRu',
        'options.price',
        'options.count',
        'options.length',
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
        'sewing_product.count',
        'sewing_product.length',
        'images',
        'categories.id',
        'categories.categoryNameEn',
        'options.id',
        'options.size',
        'options.colorEn',
        'options.price',
        'options.count',
        'options.length',
        'options.discount',
        'options.vendorCode',
        'like',
      ])
      .where('sewing_product.deleted = false')
      .andWhere('like.userId = :userId', { userId })
      .getMany();
  }

  async findOneAndOption(
    id: string,
    option: string,
  ): Promise<SewingProductEntity> {
    return await this.createQueryBuilder('sewing_product')
      .leftJoin('sewing_product.options', 'options')
      .select([
        'sewing_product.id',
        'sewing_product.price',
        'sewing_product.discount',
        'sewing_product.count',
        'sewing_product.length',
        'options.id',
        'options.price',
        'options.discount',
        'options.count',
        'options.length',
      ])
      .where('sewing_product.id = :id', { id })
      .where('options.id = :id', { id: option })
      .getOne();
  }
}
