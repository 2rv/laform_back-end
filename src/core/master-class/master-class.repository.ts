import { MasterClassEntity } from './master-class.entity';
import { Brackets, EntityRepository, Repository } from 'typeorm';
import {
  recommendationsEn,
  recommendationsEnAuth,
  recommendationsRu,
  recommendationsRuAuth,
} from '../recommendation/recommendation.select';

@EntityRepository(MasterClassEntity)
export class MasterClassRepository extends Repository<MasterClassEntity> {
  async findAllRu(
    size: number = 30,
    page: number = 1,
    sort: string,
    by: any = 'ASC',
    where: string,
    category: string,
  ): Promise<[MasterClassEntity[], number]> {
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.categories', 'categories')
      .select([
        'master_class.id',
        'master_class.type',
        'master_class.vendorCode',
        'master_class.createdDate',
        'master_class.titleRu',
        'master_class.modifierRu',
        'master_class.discount',
        'master_class.price',
        'master_class.pinned',
        'master_class.deleted',
        'images',
        'categories.id',
        'categories.categoryNameRu',
      ])
      .orderBy(sort, by)
      .take(size)
      .skip((page - 1) * size || 0)
      .where('master_class.deleted = false')
      .andWhere(
        new Brackets((qb) => {
          if (where) {
            qb.where('master_class.titleRu ILIKE :search', {
              search: `%${where}%`,
            }).orWhere('categories.categoryNameRu ILIKE :search', {
              search: `%${where}%`,
            });
          } else if (category) {
            qb.where('categories.categoryNameRu = :category', {
              category: category,
            });
          } else {
            qb.where('master_class.deleted = false');
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
  ): Promise<[MasterClassEntity[], number]> {
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.categories', 'categories')
      .select([
        'master_class.id',
        'master_class.type',
        'master_class.vendorCode',
        'master_class.createdDate',
        'master_class.titleEn',
        'master_class.modifierEn',
        'master_class.discount',
        'master_class.price',
        'master_class.pinned',
        'master_class.deleted',
        'images',
        'categories.id',
        'categories.categoryNameEn',
      ])
      .orderBy(sort, by)
      .take(size)
      .skip((page - 1) * size || 0)
      .where('master_class.deleted = false')
      .andWhere(
        new Brackets((qb) => {
          if (where) {
            qb.where('master_class.titleEn ILIKE :search', {
              search: `%${where}%`,
            }).orWhere('categories.categoryNameEn ILIKE :search', {
              search: `%${where}%`,
            });
          } else if (category) {
            qb.where('categories.categoryNameRu = :category', {
              category: category,
            });
          } else {
            qb.where('master_class.deleted = false');
          }
        }),
      )
      .getManyAndCount();
  }
  async findAllRuAuth(
    size: number = 30,
    page: number = 1,
    sort: string,
    by: any,
    where: string,
    category: string,
    userId: number,
  ): Promise<[MasterClassEntity[], number]> {
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.categories', 'categories')
      .leftJoin('master_class.like', 'like', 'like.userId = :userId', {
        userId,
      })
      .select([
        'master_class.id',
        'master_class.type',
        'master_class.vendorCode',
        'master_class.createdDate',
        'master_class.titleRu',
        'master_class.modifierRu',
        'master_class.discount',
        'master_class.price',
        'master_class.pinned',
        'master_class.deleted',
        'images',
        'categories.id',
        'categories.categoryNameRu',
        'like',
      ])
      .orderBy(sort, by)
      .take(size)
      .skip((page - 1) * size || 0)
      .where('master_class.deleted = false')
      .andWhere(
        new Brackets((qb) => {
          if (where) {
            qb.where('master_class.titleRu ILIKE :search', {
              search: `%${where}%`,
            }).orWhere('categories.categoryNameRu ILIKE :search', {
              search: `%${where}%`,
            });
          } else if (category) {
            qb.where('categories.categoryNameRu = :category', {
              category: category,
            });
          } else {
            qb.where('master_class.deleted = false');
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
    userId: number,
  ): Promise<[MasterClassEntity[], number]> {
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.categories', 'categories')
      .leftJoin('master_class.like', 'like', 'like.userId = :userId', {
        userId,
      })
      .select([
        'master_class.id',
        'master_class.type',
        'master_class.vendorCode',
        'master_class.createdDate',
        'master_class.titleEn',
        'master_class.modifierEn',
        'master_class.discount',
        'master_class.price',
        'master_class.pinned',
        'master_class.deleted',
        'images',
        'categories.id',
        'categories.categoryNameEn',
        'like',
      ])
      .orderBy(sort, by)
      .take(size)
      .skip((page - 1) * size || 0)
      .where('master_class.deleted = false')
      .andWhere(
        new Brackets((qb) => {
          if (where) {
            qb.where('master_class.titleEn ILIKE :search', {
              search: `%${where}%`,
            }).orWhere('categories.categoryNameEn ILIKE :search', {
              search: `%${where}%`,
            });
          } else if (category) {
            qb.where('categories.categoryNameRu = :category', {
              category: category,
            });
          } else {
            qb.where('master_class.deleted = false');
          }
        }),
      )
      .getManyAndCount();
  }

  async findOneRu(id: string): Promise<MasterClassEntity> {
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.categories', 'categories')
      .leftJoin('master_class.recommendation', 'recommendation')
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
        'master_class.id',
        'master_class.type',
        'master_class.vendorCode',
        'master_class.createdDate',
        'master_class.titleRu',
        'master_class.modifierRu',
        'master_class.descriptionRu',
        'master_class.materialRu',
        'master_class.discount',
        'master_class.price',
        'master_class.pinned',
        'images',
        'categories.id',
        'categories.categoryNameRu',
        ...recommendationsRu,
      ])
      .where('recommendations_sewing_product.deleted = false')
      .where('recommendations_master_class.deleted = false')
      .where('recommendations_pattern_product.deleted = false')
      .where('recommendations_post.deleted = false')
      .where('master_class.id = :id', { id })
      .getOne();
  }
  async findOneEn(id: string): Promise<MasterClassEntity> {
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.categories', 'categories')
      .leftJoin('master_class.recommendation', 'recommendation')
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
        'master_class.id',
        'master_class.type',
        'master_class.vendorCode',
        'master_class.createdDate',
        'master_class.titleEn',
        'master_class.modifierEn',
        'master_class.descriptionEn',
        'master_class.materialEn',
        'master_class.discount',
        'master_class.price',
        'master_class.pinned',
        'images',
        'categories.id',
        'categories.categoryNameEn',
        ...recommendationsEn,
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
      .leftJoin('master_class.like', 'like', 'like.userId = :userId', {
        userId,
      })
      .leftJoin('master_class.recommendation', 'recommendation')
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
        'master_class.id',
        'master_class.type',
        'master_class.vendorCode',
        'master_class.createdDate',
        'master_class.titleRu',
        'master_class.modifierRu',
        'master_class.descriptionRu',
        'master_class.materialRu',
        'master_class.discount',
        'master_class.price',
        'master_class.pinned',
        'images',
        'categories.id',
        'categories.categoryNameRu',
        'like',

        ...recommendationsRuAuth,
      ])
      .where('recommendations_sewing_product.deleted = false')
      .where('recommendations_master_class.deleted = false')
      .where('recommendations_pattern_product.deleted = false')
      .where('recommendations_post.deleted = false')
      .where('master_class.id = :id', { id })
      .getOne();
  }
  async findOneEnAuth(id: string, userId: number): Promise<MasterClassEntity> {
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.categories', 'categories')
      .leftJoin('master_class.like', 'like', 'like.userId = :userId', {
        userId,
      })
      .leftJoin('master_class.recommendation', 'recommendation')
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
        'master_class.id',
        'master_class.type',
        'master_class.vendorCode',
        'master_class.createdDate',
        'master_class.titleEn',
        'master_class.modifierEn',
        'master_class.descriptionEn',
        'master_class.materialEn',
        'master_class.discount',
        'master_class.price',
        'master_class.pinned',
        'images',
        'categories.id',
        'categories.categoryNameEn',
        'like',
        ...recommendationsEnAuth,
      ])
      .where('recommendations_sewing_product.deleted = false')
      .where('recommendations_master_class.deleted = false')
      .where('recommendations_pattern_product.deleted = false')
      .where('recommendations_post.deleted = false')
      .where('master_class.id = :id', { id })
      .getOne();
  }

  async findLikedRu(
    userId: number,
    size: number = 30,
    page: number = 1,
  ): Promise<[MasterClassEntity[], number]> {
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.categories', 'categories')
      .leftJoin('master_class.like', 'like')
      .select([
        'master_class.id',
        'master_class.type',
        'master_class.vendorCode',
        'master_class.createdDate',
        'master_class.titleRu',
        'master_class.modifierRu',
        'master_class.discount',
        'master_class.price',
        'master_class.pinned',
        'images',
        'categories.id',
        'categories.categoryNameRu',
        'like',
      ])
      .take(size)
      .skip((page - 1) * size || 0)
      .where('master_class.deleted = false')
      .andWhere('like.userId = :userId', { userId })
      .getManyAndCount();
  }
  async findLikedEn(
    userId: number,
    size: number = 30,
    page: number = 1,
  ): Promise<[MasterClassEntity[], number]> {
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.categories', 'categories')
      .leftJoin('master_class.like', 'like')
      .select([
        'master_class.id',
        'master_class.type',
        'master_class.vendorCode',
        'master_class.createdDate',
        'master_class.titleEn',
        'master_class.modifierEn',
        'master_class.discount',
        'master_class.price',
        'master_class.pinned',
        'images',
        'categories.id',
        'categories.categoryNameEn',
        'like',
      ])
      .take(size)
      .skip((page - 1) * size || 0)
      .where('master_class.deleted = false')
      .andWhere('like.userId = :userId', { userId })
      .getManyAndCount();
  }

  async findOneRuForUpdate(id: string): Promise<MasterClassEntity> {
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.categories', 'categories')
      .leftJoin('master_class.recommendation', 'recommendation')
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
        'master_class.id',
        'master_class.type',
        'master_class.vendorCode',
        'master_class.createdDate',
        'master_class.titleRu',
        'master_class.modifierRu',
        'master_class.descriptionRu',
        'master_class.materialRu',
        'master_class.articleRu',
        'master_class.discount',
        'master_class.price',
        'master_class.pinned',
        'images',
        'categories.id',
        'categories.categoryNameRu',
        ...recommendationsRu,
      ])
      .where('recommendations_sewing_product.deleted = false')
      .where('recommendations_master_class.deleted = false')
      .where('recommendations_pattern_product.deleted = false')
      .where('recommendations_post.deleted = false')
      .where('master_class.id = :id', { id })
      .getOne();
  }

  async findAllForAdmin(
    size: number = 30,
    page: number = 1,
    sort: string,
    by: any = 'ASC',
    where: string,
    category: string,
  ): Promise<[MasterClassEntity[], number]> {
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.categories', 'categories')
      .select([
        'master_class.id',
        'master_class.type',
        'master_class.vendorCode',
        'master_class.createdDate',
        'master_class.titleRu',
        'master_class.modifierRu',
        'master_class.discount',
        'master_class.price',
        'master_class.pinned',
        'master_class.deleted',
        'images',
        'categories.id',
        'categories.categoryNameRu',
      ])
      .orderBy(sort, by)
      .take(size)
      .skip((page - 1) * size || 0)
      .where(
        new Brackets((qb) => {
          if (where) {
            qb.where('master_class.titleRu ILIKE :search', {
              search: `%${where}%`,
            }).orWhere('categories.categoryNameRu ILIKE :search', {
              search: `%${where}%`,
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
