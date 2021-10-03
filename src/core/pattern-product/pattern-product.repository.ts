import { PatternProductEntity } from './pattern-product.entity';
import { Brackets, EntityRepository, Repository } from 'typeorm';

@EntityRepository(PatternProductEntity)
export class PatternProductRepository extends Repository<PatternProductEntity> {
  async findAllRu(
    size: number = 30,
    page: number = 1,
    sort: string,
    by: any = 'ASC',
    where: string,
    type: string,
  ): Promise<PatternProductEntity[]> {
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
        'pattern_product.pinned',
        'images',
        'sizes.id',
        'sizes.price',
        'sizes.size',
        'categories',
      ])
      .orderBy(sort, by)
      //   .take(size)
      //   .skip(page > 0 ? page - 1 : 0)
      .where('pattern_product.deleted = false')
      .andWhere(
        new Brackets((qb) => {
          if (where) {
            qb.where('pattern_product.titleRu ILIKE :search', {
              search: `%${where}%`,
            }).orWhere('categories.textRu ILIKE :search', {
              search: `%${where}%`,
            });
          } else if (type) {
            qb.where('pattern_product.type = :type', {
              type: type,
            });
          } else {
            qb.where('pattern_product.deleted = false');
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
    type: string,
  ): Promise<PatternProductEntity[]> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.sizes', 'sizes')
      .leftJoin('pattern_product.categories', 'categories')
      .select([
        'pattern_product.id',
        'pattern_product.titleEn',
        'pattern_product.type',
        'pattern_product.modifier',
        'pattern_product.complexity',
        'pattern_product.discount',
        'pattern_product.pinned',
        'images',
        'sizes.id',
        'sizes.price',
        'sizes.size',
        'categories',
      ])
      .orderBy(sort, by)
      //   .take(size)
      //   .skip(page > 0 ? page - 1 : 0)
      .where('pattern_product.deleted = false')
      .andWhere(
        new Brackets((qb) => {
          if (where) {
            qb.where('pattern_product.titleEn ILIKE :search', {
              search: `%${where}%`,
            }).orWhere('categories.textEn ILIKE :search', {
              search: `%${where}%`,
            });
          } else if (type) {
            qb.where('pattern_product.type = :type', {
              type: type,
            });
          } else {
            qb.where('pattern_product.deleted = false');
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
    type: string,
    userId: number,
  ): Promise<PatternProductEntity[]> {
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
        'sizes.id',
        'sizes.price',
        'sizes.size',
        'categories',
        'like',
      ])
      .orderBy(sort, by)
      //   .take(size)
      //   .skip(page > 0 ? page - 1 : 0)
      .where('pattern_product.deleted = false')
      .andWhere(
        new Brackets((qb) => {
          if (where) {
            qb.where('pattern_product.titleRu ILIKE :search', {
              search: `%${where}%`,
            }).orWhere('categories.textRu ILIKE :search', {
              search: `%${where}%`,
            });
          } else if (type) {
            qb.where('pattern_product.type = :type', {
              type: type,
            });
          } else {
            qb.where('pattern_product.deleted = false');
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
    type: string,
    userId: number,
  ): Promise<PatternProductEntity[]> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.sizes', 'sizes')
      .leftJoin('pattern_product.categories', 'categories')
      .leftJoin('pattern_product.like', 'like', 'like.userId = :userId', {
        userId,
      })
      .select([
        'pattern_product.id',
        'pattern_product.titleEn',
        'pattern_product.type',
        'pattern_product.modifier',
        'pattern_product.complexity',
        'pattern_product.discount',
        'images',
        'sizes.id',
        'sizes.price',
        'sizes.size',
        'categories',
        'like',
      ])
      .orderBy(sort, by)
      //   .take(size)
      //   .skip(page > 0 ? page - 1 : 0)
      .where('pattern_product.deleted = false')
      .andWhere(
        new Brackets((qb) => {
          if (where) {
            qb.where('pattern_product.titleEn ILIKE :search', {
              search: `%${where}%`,
            }).orWhere('categories.textEn ILIKE :search', {
              search: `%${where}%`,
            });
          } else if (type) {
            qb.where('pattern_product.type = :type', {
              type: type,
            });
          } else {
            qb.where('pattern_product.deleted = false');
          }
        }),
      )
      //   .getManyAndCount();
      .getMany();
  }

  async findOneRu(id: string): Promise<PatternProductEntity> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.categories', 'categories')
      .leftJoin('pattern_product.sizes', 'sizes')
      .leftJoin('pattern_product.recommendation', 'recommendation')
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
      .where('pattern_product.id = :id', { id })
      .getOne();
  }
  async findOneEn(id: string): Promise<PatternProductEntity> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.categories', 'categories')
      .leftJoin('pattern_product.sizes', 'sizes')
      .leftJoin('pattern_product.recommendation', 'recommendation')
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

        'recommendation.id',
        'recommendations.id',
        'recommendations_master_class.id',
        'recommendations_master_class.titleEn',
        'recommendations_master_class.modifier',
        'recommendations_master_class.discount',
        'recommendations_master_class.type',
        'recommendations_master_class_images',
        'recommendations_master_class_programs.id',
        'recommendations_master_class_programs.price',

        'recommendations_pattern_product.id',
        'recommendations_pattern_product.titleEn',
        'recommendations_pattern_product.type',
        'recommendations_pattern_product.modifier',
        'recommendations_pattern_product.complexity',
        'recommendations_pattern_product.discount',
        'recommendations_pattern_product_images',
        'recommendations_pattern_product_sizes.id',
        'recommendations_pattern_product_sizes.price',

        'recommendations_sewing_product.id',
        'recommendations_sewing_product.titleEn',
        'recommendations_sewing_product.discount',
        'recommendations_sewing_product.modifier',
        'recommendations_sewing_product.type',
        'recommendations_sewing_product_images',
        'recommendations_sewing_product_sizes.id',
        'recommendations_sewing_product_sizes.size',
        'recommendations_sewing_product_sizes.price',

        'recommendations_post.id',
        'recommendations_post.titleEn',
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
      .leftJoin('pattern_product.like', 'like', 'like.userId = :userId', {
        userId,
      })
      .leftJoin('pattern_product.recommendation', 'recommendation')
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
      ])
      .where('recommendations_sewing_product.deleted = false')
      .where('recommendations_master_class.deleted = false')
      .where('recommendations_pattern_product.deleted = false')
      .where('recommendations_post.deleted = false')
      .where('pattern_product.id = :id', { id })
      .getOne();
  }
  async findOneEnAuth(
    id: string,
    userId: number,
  ): Promise<PatternProductEntity> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.categories', 'categories')
      .leftJoin('pattern_product.sizes', 'sizes')
      .leftJoin('pattern_product.like', 'like', 'like.userId = :userId', {
        userId,
      })
      .leftJoin('pattern_product.recommendation', 'recommendation')
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
        'categories',
        'sizes.id',
        'sizes.size',
        'sizes.price',
        'sizes.vendorCode',
        'like',

        'recommendation.id',
        'recommendations.id',
        'recommendations_master_class.id',
        'recommendations_master_class.titleEn',
        'recommendations_master_class.modifier',
        'recommendations_master_class.discount',
        'recommendations_master_class.type',
        'recommendations_master_class_images',
        'recommendations_master_class_programs.id',
        'recommendations_master_class_programs.price',
        'recommendations_master_class_like',

        'recommendations_pattern_product.id',
        'recommendations_pattern_product.titleEn',
        'recommendations_pattern_product.type',
        'recommendations_pattern_product.modifier',
        'recommendations_pattern_product.complexity',
        'recommendations_pattern_product.discount',
        'recommendations_pattern_product_images',
        'recommendations_pattern_product_sizes.id',
        'recommendations_pattern_product_sizes.price',
        'recommendations_pattern_product_like',

        'recommendations_sewing_product.id',
        'recommendations_sewing_product.titleEn',
        'recommendations_sewing_product.discount',
        'recommendations_sewing_product.modifier',
        'recommendations_sewing_product.type',
        'recommendations_sewing_product_images',
        'recommendations_sewing_product_sizes.id',
        'recommendations_sewing_product_sizes.size',
        'recommendations_sewing_product_sizes.price',
        'recommendations_sewing_product_like',

        'recommendations_post.id',
        'recommendations_post.titleEn',
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
        'sizes.size',
        'sizes.price',
        'sizes.vendorCode',
      ])
      .where('pattern_product.deleted = false')
      .andWhere('pattern_product.pinned = true')
      .getMany();
  }
  async findPinnedEn(): Promise<PatternProductEntity[]> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.sizes', 'sizes')
      .select([
        'pattern_product.id',
        'pattern_product.titleEn',
        'pattern_product.descriptionEn',
        'pattern_product.type',
        'pattern_product.modifier',
        'pattern_product.materialRu',
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
        'sizes.size',
        'sizes.price',
        'sizes.vendorCode',
        'like',
      ])
      .where('pattern_product.deleted = false')
      .andWhere('pattern_product.pinned = true')
      .getMany();
  }
  async findPinnedEnAuth(userId: number): Promise<PatternProductEntity[]> {
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
        'sizes.size',
        'sizes.price',
        'sizes.vendorCode',
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
        'categories',
        'images',
        'sizes.id',
        'sizes.size',
        'sizes.price',
        'sizes.vendorCode',
        'like',
      ])
      .where('pattern_product.deleted = false')
      .andWhere('like.userId = :userId', { userId })
      .getMany();
  }
  async findLikedEn(userId: number): Promise<PatternProductEntity[]> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.sizes', 'sizes')
      .leftJoin('pattern_product.categories', 'categories')
      .leftJoin('pattern_product.like', 'like')
      .select([
        'pattern_product.id',
        'pattern_product.titleEn',
        'pattern_product.type',
        'pattern_product.modifier',
        'pattern_product.complexity',
        'pattern_product.discount',
        'categories',
        'images',
        'sizes.id',
        'sizes.size',
        'sizes.price',
        'sizes.vendorCode',
        'like',
      ])
      .where('pattern_product.deleted = false')
      .andWhere('like.userId = :userId', { userId })
      .getMany();
  }
}
