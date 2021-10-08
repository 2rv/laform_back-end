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
  ): Promise<MasterClassEntity[]> {
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.categories', 'categories')
      .select([
        'master_class.id',
        'master_class.type',
        'master_class.vendorCode',
        'master_class.titleRu',
        'master_class.modifierRu',
        'master_class.discount',
        'master_class.price',
        'master_class.pinned',
        'images',
        'categories.id',
        'categories.categoryNameRu',
      ])
      .orderBy(sort, by)
      //   .take(size)
      //   .skip(page > 0 ? page - 1 : 0)
      .where('master_class.deleted = false')
      .andWhere(
        new Brackets((qb) => {
          if (where) {
            qb.where('master_class.titleRu ILIKE :search', {
              search: `%${where}%`,
            }).orWhere('categories.categoryNameRu ILIKE :search', {
              search: `%${where}%`,
            });
          } else {
            qb.where('master_class.deleted = false');
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
  ): Promise<MasterClassEntity[]> {
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.categories', 'categories')
      .select([
        'master_class.id',
        'master_class.type',
        'master_class.vendorCode',
        'master_class.titleEn',
        'master_class.modifierEn',
        'master_class.discount',
        'master_class.price',
        'master_class.pinned',
        'images',
        'categories.id',
        'categories.categoryNameEn',
      ])
      .orderBy(sort, by)
      //   .take(size)
      //   .skip(page > 0 ? page - 1 : 0)
      .where('master_class.deleted = false')
      .andWhere(
        new Brackets((qb) => {
          if (where) {
            qb.where('master_class.titleEn ILIKE :search', {
              search: `%${where}%`,
            }).orWhere('categories.categoryNameEn ILIKE :search', {
              search: `%${where}%`,
            });
          } else {
            qb.where('master_class.deleted = false');
          }
        }),
      )
      //   .getManyAndCount();
      .getMany();
  }
  async findAllRuAuth(
    size: number = 2,
    page: number = 1,
    sort: string,
    by: any,
    where: string,
    userId: number,
  ): Promise<MasterClassEntity[]> {
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
      .orderBy(sort, by)
      //   .take(page * size)
      //   .skip(page)
      .where('master_class.deleted = false')
      .andWhere(
        new Brackets((qb) => {
          if (where) {
            qb.where('master_class.titleRu ILIKE :search', {
              search: `%${where}%`,
            }).orWhere('categories.categoryNameRu ILIKE :search', {
              search: `%${where}%`,
            });
          } else {
            qb.where('master_class.deleted = false');
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
  ): Promise<MasterClassEntity[]> {
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
      .orderBy(sort, by)
      //   .take(size)
      //   .skip(page > 0 ? page - 1 : 0)
      .where('master_class.deleted = false')
      .andWhere(
        new Brackets((qb) => {
          if (where) {
            qb.where('master_class.titleEn ILIKE :search', {
              search: `%${where}%`,
            }).orWhere('categories.categoryNameEn ILIKE :search', {
              search: `%${where}%`,
            });
          } else {
            qb.where('master_class.deleted = false');
          }
        }),
      )
      //    .getManyAndCount();
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
      .leftJoin(
        'recommendations_sewing_product.colors',
        'recommendations_sewing_product_colors',
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
      .leftJoin(
        'recommendations_sewing_product.colors',
        'recommendations_sewing_product_colors',
      )

      .leftJoin('recommendations.postId', 'recommendations_post')
      .leftJoin('recommendations_post.image', 'recommendations_post_image')
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
        'programs.programNameEn',

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
        'recommendations_sewing_product.color',
        'recommendations_sewing_product_color',
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
        'programs.programNameEn',
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

  async findPinnedRu(): Promise<MasterClassEntity[]> {
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.categories', 'categories')
      .select([
        'master_class.id',
        'master_class.type',
        'master_class.vendorCode',
        'master_class.titleRu',
        'master_class.modifierRu',
        'master_class.discount',
        'master_class.price',
        'master_class.pinned',
        'images',
        'categories.id',
        'categories.categoryNameRu',
      ])
      .where('master_class.pinned = true')
      .getMany();
  }
  async findPinnedEn(): Promise<MasterClassEntity[]> {
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.categories', 'categories')
      .select([
        'master_class.id',
        'master_class.type',
        'master_class.vendorCode',
        'master_class.titleEn',
        'master_class.modifierEn',
        'master_class.discount',
        'master_class.price',
        'master_class.pinned',
        'images',
        'categories.id',
        'categories.categoryNameEn',
      ])
      .where('master_class.pinned = true')
      .getMany();
  }
  async findPinnedRuAuth(userId: number): Promise<MasterClassEntity[]> {
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
      .where('master_class.pinned = true')
      .getMany();
  }
  async findPinnedEnAuth(userId: number): Promise<MasterClassEntity[]> {
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
      .where('master_class.pinned = true')
      .getMany();
  }

  async findLikedRu(userId: number): Promise<MasterClassEntity[]> {
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.categories', 'categories')
      .leftJoin('master_class.like', 'like')
      .select([
        'master_class.id',
        'master_class.type',
        'master_class.vendorCode',
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
      .where('master_class.deleted = false')
      .andWhere('like.userId = :userId', { userId })
      .getMany();
  }
  async findLikedEn(userId: number): Promise<MasterClassEntity[]> {
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.categories', 'categories')
      .leftJoin('master_class.like', 'like')
      .select([
        'master_class.id',
        'master_class.type',
        'master_class.vendorCode',
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
      .where('master_class.deleted = false')
      .andWhere('like.userId = :userId', { userId })
      .getMany();
  }
}
