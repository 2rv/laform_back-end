import { PatternProductEntity } from './pattern-product.entity';
import { Brackets, EntityRepository, Repository } from 'typeorm';
import {
  recommendationsEn,
  recommendationsEnAuth,
  recommendationsRu,
  recommendationsRuAuth,
} from '../recommendation/recommendation.select';

@EntityRepository(PatternProductEntity)
export class PatternProductRepository extends Repository<PatternProductEntity> {
  async findAllRu(
    size: number = 30,
    page: number = 1,
    sort: string,
    by: 'DESC' | 'ASC' = 'DESC',
    where: string,
    type: string,
    category: string,
  ): Promise<[PatternProductEntity[], number]> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.categories', 'categories')
      .leftJoin('pattern_product.options', 'options')
      .select([
        'pattern_product.id',
        'pattern_product.type',
        'pattern_product.optionType',
        'pattern_product.titleRu',
        'pattern_product.modifierRu',
        'pattern_product.complexity',
        'pattern_product.pinned',
        'pattern_product.vendorCode',
        'pattern_product.price',
        'pattern_product.discount',
        'pattern_product.count',
        'pattern_product.isCount',
        'pattern_product.createdDate',
        'pattern_product.deleted',
        'pattern_product.clickCount',
        'images',
        'categories.id',
        'categories.categoryNameRu',
        'options.id',
        'options.price',
        'options.discount',
        'options.size',
        'options.count',
        'options.vendorCode',
        'options.optionVisibility',
      ])
      .orderBy(sort, by)
      .take(size)
      .skip((page - 1) * size || 0)
      .where('pattern_product.deleted = false')
      .andWhere(
        new Brackets((qb) => {
          if (where) {
            qb.where('pattern_product.titleRu ILIKE :search', {
              search: `%${where}%`,
            }).orWhere('categories.categoryNameRu ILIKE :search', {
              search: `%${where}%`,
            });
          } else if (type) {
            qb.where('pattern_product.type = :type', {
              type: type,
            });
          } else if (category) {
            qb.where('categories.categoryNameRu = :category', {
              category: category,
            });
          } else {
            qb.where('pattern_product.deleted = false');
          }
        }),
      )
      .andWhere(
        new Brackets((qb) => {
          qb.where('options.optionVisibility = true').orWhere(
            'pattern_product.optionType = 0',
          );
        }),
      )
      .getManyAndCount();
  }
  async findAllEn(
    size: number = 30,
    page: number = 1,
    sort: string,
    by: 'DESC' | 'ASC' = 'DESC',
    where: string,
    type: string,
    category: string,
  ): Promise<[PatternProductEntity[], number]> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.categories', 'categories')
      .leftJoin('pattern_product.options', 'options')
      .select([
        'pattern_product.id',
        'pattern_product.type',
        'pattern_product.optionType',
        'pattern_product.titleEn',
        'pattern_product.modifierEn',
        'pattern_product.complexity',
        'pattern_product.pinned',
        'pattern_product.vendorCode',
        'pattern_product.price',
        'pattern_product.discount',
        'pattern_product.count',
        'pattern_product.isCount',
        'pattern_product.createdDate',
        'pattern_product.deleted',
        'pattern_product.clickCount',
        'images',
        'categories.id',
        'categories.categoryNameEn',
        'options.id',
        'options.price',
        'options.discount',
        'options.size',
        'options.count',
        'options.vendorCode',
        'options.optionVisibility',
      ])
      .orderBy(sort, by)
      .take(size)
      .skip((page - 1) * size || 0)
      .where('pattern_product.deleted = false')
      .andWhere(
        new Brackets((qb) => {
          if (where) {
            qb.where('pattern_product.titleEn ILIKE :search', {
              search: `%${where}%`,
            }).orWhere('categories.categoryNameEn ILIKE :search', {
              search: `%${where}%`,
            });
          } else if (type) {
            qb.where('pattern_product.type = :type', {
              type: type,
            });
          } else if (category) {
            qb.where('categories.categoryNameEn = :category', {
              category: category,
            });
          } else {
            qb.where('pattern_product.deleted = false');
          }
        }),
      )
      .andWhere(
        new Brackets((qb) => {
          qb.where('options.optionVisibility = true').orWhere(
            'pattern_product.optionType = 0',
          );
        }),
      )
      .getManyAndCount();
  }
  async findAllRuAuth(
    size: number = 30,
    page: number = 1,
    sort: string,
    by: 'DESC' | 'ASC' = 'DESC',
    where: string,
    type: string,
    category: string,
    userId: number,
  ): Promise<[PatternProductEntity[], number]> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.categories', 'categories')
      .leftJoin('pattern_product.options', 'options')
      .leftJoin('pattern_product.like', 'like', 'like.userId = :userId', {
        userId,
      })
      .select([
        'pattern_product.id',
        'pattern_product.type',
        'pattern_product.optionType',
        'pattern_product.titleRu',
        'pattern_product.modifierRu',
        'pattern_product.complexity',
        'pattern_product.pinned',
        'pattern_product.vendorCode',
        'pattern_product.price',
        'pattern_product.discount',
        'pattern_product.count',
        'pattern_product.isCount',
        'pattern_product.createdDate',
        'pattern_product.deleted',
        'pattern_product.clickCount',
        'images',
        'categories.id',
        'categories.categoryNameRu',
        'options.id',
        'options.price',
        'options.discount',
        'options.size',
        'options.count',
        'options.vendorCode',
        'options.optionVisibility',
        'like',
      ])
      .orderBy(sort, by)
      .take(size)
      .skip((page - 1) * size || 0)
      .where('pattern_product.deleted = false')
      .andWhere(
        new Brackets((qb) => {
          if (where) {
            qb.where('pattern_product.titleRu ILIKE :search', {
              search: `%${where}%`,
            }).orWhere('categories.categoryNameRu ILIKE :search', {
              search: `%${where}%`,
            });
          } else if (type) {
            qb.where('pattern_product.type = :type', {
              type: type,
            });
          } else if (category) {
            qb.where('categories.categoryNameRu = :category', {
              category: category,
            });
          } else {
            qb.where('pattern_product.deleted = false');
          }
        }),
      )
      .andWhere(
        new Brackets((qb) => {
          qb.where('options.optionVisibility = true').orWhere(
            'pattern_product.optionType = 0',
          );
        }),
      )
      .getManyAndCount();
  }
  async findAllEnAuth(
    size: number = 30,
    page: number = 1,
    sort: string,
    by: 'DESC' | 'ASC' = 'DESC',
    where: string,
    type: string,
    category: string,

    userId: number,
  ): Promise<[PatternProductEntity[], number]> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.categories', 'categories')
      .leftJoin('pattern_product.options', 'options')
      .leftJoin('pattern_product.like', 'like', 'like.userId = :userId', {
        userId,
      })
      .select([
        'pattern_product.id',
        'pattern_product.type',
        'pattern_product.optionType',
        'pattern_product.titleEn',
        'pattern_product.modifierEn',
        'pattern_product.complexity',
        'pattern_product.pinned',
        'pattern_product.vendorCode',
        'pattern_product.price',
        'pattern_product.discount',
        'pattern_product.count',
        'pattern_product.isCount',
        'pattern_product.createdDate',
        'pattern_product.deleted',
        'pattern_product.clickCount',
        'images',
        'categories.id',
        'categories.categoryNameEn',
        'options.id',
        'options.price',
        'options.discount',
        'options.size',
        'options.count',
        'options.vendorCode',
        'options.optionVisibility',
        'like',
      ])
      .orderBy(sort, by)
      .take(size)
      .skip((page - 1) * size || 0)
      .where('pattern_product.deleted = false')
      .andWhere(
        new Brackets((qb) => {
          if (where) {
            qb.where('pattern_product.titleEn ILIKE :search', {
              search: `%${where}%`,
            }).orWhere('categories.categoryNameEn ILIKE :search', {
              search: `%${where}%`,
            });
          } else if (type) {
            qb.where('pattern_product.type = :type', {
              type: type,
            });
          } else if (category) {
            qb.where('categories.categoryNameEn = :category', {
              category: category,
            });
          } else {
            qb.where('pattern_product.deleted = false');
          }
        }),
      )
      .andWhere(
        new Brackets((qb) => {
          qb.where('options.optionVisibility = true').orWhere(
            'pattern_product.optionType = 0',
          );
        }),
      )
      .getManyAndCount();
  }

  async findOneRu(id: string): Promise<PatternProductEntity> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.categories', 'categories')
      .leftJoin('pattern_product.options', 'options')
      .leftJoin('pattern_product.recommendation', 'recommendation')
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
        'pattern_product.id',
        'pattern_product.type',
        'pattern_product.optionType',
        'pattern_product.titleRu',
        'pattern_product.modifierRu',
        'pattern_product.descriptionRu',
        'pattern_product.materialRu',
        'pattern_product.complexity',
        'pattern_product.pinned',
        'pattern_product.vendorCode',
        'pattern_product.price',
        'pattern_product.discount',
        'pattern_product.count',
        'pattern_product.isCount',
        'pattern_product.materialOld',
        'pattern_product.descriptionOld',
        'pattern_product.clickCount',
        'images',
        'categories.id',
        'categories.categoryNameRu',
        'options.id',
        'options.price',
        'options.discount',
        'options.size',
        'options.count',
        'options.vendorCode',
        'options.optionVisibility',
        ...recommendationsRu,
      ])
      .where('recommendations_sewing_product.deleted = false')
      .where('recommendations_master_class.deleted = false')
      .where('recommendations_pattern_product.deleted = false')
      .where('recommendations_post.deleted = false')
      .where('pattern_product.id = :id', { id })
      .andWhere(
        new Brackets((qb) => {
          qb.where('options.optionVisibility = true').orWhere(
            'pattern_product.optionType = 0',
          );
        }),
      )
      .getOne();
  }
  async findOneEn(id: string): Promise<PatternProductEntity> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.categories', 'categories')
      .leftJoin('pattern_product.options', 'options')
      .leftJoin('pattern_product.recommendation', 'recommendation')
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
        'pattern_product.id',
        'pattern_product.type',
        'pattern_product.optionType',
        'pattern_product.titleEn',
        'pattern_product.modifierEn',
        'pattern_product.descriptionEn',
        'pattern_product.materialEn',
        'pattern_product.complexity',
        'pattern_product.pinned',
        'pattern_product.vendorCode',
        'pattern_product.price',
        'pattern_product.discount',
        'pattern_product.count',
        'pattern_product.isCount',
        'pattern_product.materialOld',
        'pattern_product.descriptionOld',
        'pattern_product.clickCount',
        'images',
        'categories.id',
        'categories.categoryNameEn',
        'options.id',
        'options.price',
        'options.discount',
        'options.size',
        'options.count',
        'options.vendorCode',
        'options.optionVisibility',
        ...recommendationsEn,
      ])
      .where('recommendations_sewing_product.deleted = false')
      .where('recommendations_master_class.deleted = false')
      .where('recommendations_pattern_product.deleted = false')
      .where('recommendations_post.deleted = false')
      .where('pattern_product.id = :id', { id })
      .andWhere(
        new Brackets((qb) => {
          qb.where('options.optionVisibility = true').orWhere(
            'pattern_product.optionType = 0',
          );
        }),
      )
      .getOne();
  }
  async findOneRuAuth(
    id: string,
    userId: number,
  ): Promise<PatternProductEntity> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.categories', 'categories')
      .leftJoin('pattern_product.options', 'options')
      .leftJoin('pattern_product.like', 'like', 'like.userId = :userId', {
        userId,
      })
      .leftJoin('pattern_product.recommendation', 'recommendation')
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
        'pattern_product.id',
        'pattern_product.type',
        'pattern_product.optionType',
        'pattern_product.titleRu',
        'pattern_product.modifierRu',
        'pattern_product.descriptionRu',
        'pattern_product.materialRu',
        'pattern_product.complexity',
        'pattern_product.pinned',
        'pattern_product.vendorCode',
        'pattern_product.price',
        'pattern_product.discount',
        'pattern_product.count',
        'pattern_product.isCount',
        'pattern_product.materialOld',
        'pattern_product.descriptionOld',
        'images',
        'categories.id',
        'categories.categoryNameRu',
        'options.id',
        'options.price',
        'options.discount',
        'options.size',
        'options.count',
        'options.vendorCode',
        'options.optionVisibility',
        'like',

        ...recommendationsRuAuth,
      ])
      .where('recommendations_sewing_product.deleted = false')
      .where('recommendations_master_class.deleted = false')
      .where('recommendations_pattern_product.deleted = false')
      .where('recommendations_post.deleted = false')
      .where('pattern_product.id = :id', { id })
      .andWhere(
        new Brackets((qb) => {
          qb.where('options.optionVisibility = true').orWhere(
            'pattern_product.optionType = 0',
          );
        }),
      )
      .getOne();
  }
  async findOneEnAuth(
    id: string,
    userId: number,
  ): Promise<PatternProductEntity> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.categories', 'categories')
      .leftJoin('pattern_product.options', 'options')
      .leftJoin('pattern_product.like', 'like', 'like.userId = :userId', {
        userId,
      })
      .leftJoin('pattern_product.recommendation', 'recommendation')
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
        'pattern_product.id',
        'pattern_product.type',
        'pattern_product.optionType',
        'pattern_product.titleEn',
        'pattern_product.modifierEn',
        'pattern_product.descriptionEn',
        'pattern_product.materialEn',
        'pattern_product.complexity',
        'pattern_product.pinned',
        'pattern_product.vendorCode',
        'pattern_product.price',
        'pattern_product.discount',
        'pattern_product.count',
        'pattern_product.isCount',
        'pattern_product.materialOld',
        'pattern_product.descriptionOld',
        'images',
        'categories.id',
        'categories.categoryNameEn',
        'options.id',
        'options.price',
        'options.discount',
        'options.size',
        'options.count',
        'options.vendorCode',
        'options.optionVisibility',
        'like',

        ...recommendationsEnAuth,
      ])
      .where('recommendations_sewing_product.deleted = false')
      .where('recommendations_master_class.deleted = false')
      .where('recommendations_pattern_product.deleted = false')
      .where('recommendations_post.deleted = false')
      .where('pattern_product.id = :id', { id })
      .andWhere(
        new Brackets((qb) => {
          qb.where('options.optionVisibility = true').orWhere(
            'pattern_product.optionType = 0',
          );
        }),
      )
      .getOne();
  }

  async findLikedRu(
    userId: number,
    size: number = 30,
    page: number = 1,
  ): Promise<[PatternProductEntity[], number]> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.categories', 'categories')
      .leftJoin('pattern_product.options', 'options')
      .leftJoin('pattern_product.like', 'like')
      .select([
        'pattern_product.id',
        'pattern_product.type',
        'pattern_product.optionType',
        'pattern_product.titleRu',
        'pattern_product.modifierRu',
        'pattern_product.complexity',
        'pattern_product.pinned',
        'pattern_product.vendorCode',
        'pattern_product.price',
        'pattern_product.discount',
        'pattern_product.count',
        'pattern_product.isCount',
        'images',
        'categories.id',
        'categories.categoryNameRu',
        'options.id',
        'options.price',
        'options.discount',
        'options.size',
        'options.count',
        'options.vendorCode',
        'options.optionVisibility',
        'like',
      ])
      .take(size)
      .skip((page - 1) * size || 0)
      .where('pattern_product.deleted = false')
      .andWhere('like.userId = :userId', { userId })
      .andWhere(
        new Brackets((qb) => {
          qb.where('options.optionVisibility = true').orWhere(
            'pattern_product.optionType = 0',
          );
        }),
      )
      .getManyAndCount();
  }
  async findLikedEn(
    userId: number,
    size: number = 30,
    page: number = 1,
  ): Promise<[PatternProductEntity[], number]> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.categories', 'categories')
      .leftJoin('pattern_product.options', 'options')
      .leftJoin('pattern_product.like', 'like')
      .select([
        'pattern_product.id',
        'pattern_product.type',
        'pattern_product.optionType',
        'pattern_product.titleEn',
        'pattern_product.modifierEn',
        'pattern_product.complexity',
        'pattern_product.pinned',
        'pattern_product.vendorCode',
        'pattern_product.price',
        'pattern_product.discount',
        'pattern_product.count',
        'pattern_product.isCount',
        'images',
        'categories.id',
        'categories.categoryNameEn',
        'options.id',
        'options.price',
        'options.discount',
        'options.size',
        'options.count',
        'options.vendorCode',
        'options.optionVisibility',
        'like',
      ])
      .take(size)
      .skip((page - 1) * size || 0)
      .where('pattern_product.deleted = false')
      .andWhere('like.userId = :userId', { userId })
      .andWhere(
        new Brackets((qb) => {
          qb.where('options.optionVisibility = true').orWhere(
            'pattern_product.optionType = 0',
          );
        }),
      )
      .getManyAndCount();
  }

  async findOneAndOption(
    id: string,
    option: string,
  ): Promise<PatternProductEntity> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.options', 'options')
      .select([
        'pattern_product.id',
        'pattern_product.titleRu',
        'pattern_product.titleEn',
        'pattern_product.price',
        'pattern_product.discount',
        'pattern_product.count',
        'pattern_product.isCount',
        'options.id',
        'options.price',
        'options.discount',
        'options.count',
      ])
      .where('pattern_product.id = :id', { id })
      .where('options.id = :id', { id: option })
      .getOne();
  }

  async findOneForUpdate(id: string): Promise<PatternProductEntity> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.categories', 'categories')
      .leftJoin('pattern_product.filesPdf', 'pattern_product_filesPdf')
      .leftJoin('pattern_product.options', 'options')
      .leftJoin('options.filesPdf', 'options_filesPdf')
      .leftJoin('pattern_product.recommendation', 'recommendation')
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
        'pattern_product.id',
        'pattern_product.type',
        'pattern_product.optionType',
        'pattern_product.titleRu',
        'pattern_product.modifierRu',
        'pattern_product.descriptionRu',
        'pattern_product.materialRu',
        'pattern_product.complexity',
        'pattern_product.pinned',
        'pattern_product.vendorCode',
        'pattern_product.price',
        'pattern_product.discount',
        'pattern_product.count',
        'pattern_product.isCount',
        'pattern_product_filesPdf',
        'pattern_product.deleted',
        'pattern_product.materialOld',
        'pattern_product.descriptionOld',
        'images',
        'categories.id',
        'categories.categoryNameRu',
        'options.id',
        'options.price',
        'options.discount',
        'options.size',
        'options.count',
        'options.vendorCode',
        'options_filesPdf',
        'options.optionVisibility',
        ...recommendationsRu,
      ])
      .where('pattern_product.id = :id', { id })
      .getOne();
  }

  async findAllForAdmin(
    size: number = 30,
    page: number = 1,
    sort: string,
    by: 'DESC' | 'ASC' = 'DESC',
    where: string,
    type: string,
    category: string,
  ): Promise<[PatternProductEntity[], number]> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.categories', 'categories')
      .leftJoin('pattern_product.options', 'options')
      .select([
        'pattern_product.id',
        'pattern_product.type',
        'pattern_product.optionType',
        'pattern_product.titleRu',
        'pattern_product.modifierRu',
        'pattern_product.complexity',
        'pattern_product.pinned',
        'pattern_product.vendorCode',
        'pattern_product.price',
        'pattern_product.discount',
        'pattern_product.count',
        'pattern_product.isCount',
        'pattern_product.createdDate',
        'pattern_product.deleted',
        'images',
        'categories.id',
        'categories.categoryNameRu',
        'options.id',
        'options.price',
        'options.discount',
        'options.size',
        'options.count',
        'options.vendorCode',
        'options.optionVisibility',
      ])
      .orderBy(sort, by)
      .take(size)
      .skip((page - 1) * size || 0)
      .where(
        new Brackets((qb) => {
          if (where) {
            qb.where('pattern_product.titleRu ILIKE :search', {
              search: `%${where}%`,
            }).orWhere('categories.categoryNameRu ILIKE :search', {
              search: `%${where}%`,
            });
          } else if (type) {
            qb.where('pattern_product.type = :type', {
              type: type,
            });
          } else if (category) {
            qb.where('categories.categoryNameRu = :category', {
              category: category,
            });
          }
        }),
      )
      .getManyAndCount();
  }
}
