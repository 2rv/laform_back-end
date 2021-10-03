import { SewingProductEntity } from './sewing-product.entity';
import { Brackets, EntityRepository, Repository } from 'typeorm';

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
      .leftJoin('sewing_product.sizes', 'sizes')
      .leftJoin('sewing_product.colors', 'colors')
      .select([
        'sewing_product.id',
        'sewing_product.titleRu',
        'sewing_product.discount',
        'sewing_product.modifier',
        'sewing_product.type',
        'sewing_product.pinned',
        'images',
        'categories',
        'colors',
        'sizes.id',
        'sizes.size',
        'sizes.price',
        'sizes.vendorCode',
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
            }).orWhere('categories.textRu ILIKE :search', {
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
      .leftJoin('sewing_product.sizes', 'sizes')
      .leftJoin('sewing_product.colors', 'colors')
      .select([
        'sewing_product.id',
        'sewing_product.titleEn',
        'sewing_product.discount',
        'sewing_product.modifier',
        'sewing_product.type',
        'sewing_product.pinned',
        'images',
        'categories',
        'colors',
        'sizes.id',
        'sizes.size',
        'sizes.price',
        'sizes.vendorCode',
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
            }).orWhere('categories.textEn ILIKE :search', {
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
      .leftJoin('sewing_product.sizes', 'sizes')
      .leftJoin('sewing_product.colors', 'colors')
      .leftJoin('sewing_product.like', 'like', 'like.userId = :userId', {
        userId,
      })
      .select([
        'sewing_product.id',
        'sewing_product.titleRu',
        'sewing_product.discount',
        'sewing_product.modifier',
        'sewing_product.type',
        'images',
        'categories',
        'colors',
        'sizes.id',
        'sizes.size',
        'sizes.price',
        'sizes.vendorCode',
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
            }).orWhere('categories.textRu ILIKE :search', {
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
      .leftJoin('sewing_product.sizes', 'sizes')
      .leftJoin('sewing_product.colors', 'colors')
      .leftJoin('sewing_product.like', 'like', 'like.userId = :userId', {
        userId,
      })
      .select([
        'sewing_product.id',
        'sewing_product.titleEn',
        'sewing_product.discount',
        'sewing_product.modifier',
        'sewing_product.type',
        'images',
        'categories',
        'colors',
        'sizes.id',
        'sizes.size',
        'sizes.price',
        'sizes.vendorCode',
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
            }).orWhere('categories.textEn ILIKE :search', {
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
        'sewing_product.discount',
        'sewing_product.modifier',
        'sewing_product.type',
        'images',
        'categories',
        'colors',
        'sizes.id',
        'sizes.vendorCode',
        'sizes.size',
        'sizes.price',

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
        'recommendations_master_class_programs.programNameRu',
        'recommendations_master_class_programs.vendorCode',

        'recommendations_pattern_product.id',
        'recommendations_pattern_product.titleRu',
        'recommendations_pattern_product.type',
        'recommendations_pattern_product.modifier',
        'recommendations_pattern_product.complexity',
        'recommendations_pattern_product.discount',
        'recommendations_pattern_product_images',
        'recommendations_pattern_product_sizes.id',
        'recommendations_pattern_product_sizes.price',
        'recommendations_pattern_product_sizes.size',
        'recommendations_pattern_product_sizes.vendorCode',

        'recommendations_sewing_product.id',
        'recommendations_sewing_product.titleRu',
        'recommendations_sewing_product.discount',
        'recommendations_sewing_product.modifier',
        'recommendations_sewing_product.type',
        'recommendations_sewing_product_images',
        'recommendations_sewing_product_sizes.id',
        'recommendations_sewing_product_sizes.size',
        'recommendations_sewing_product_sizes.price',
        'recommendations_sewing_product_sizes.vendorCode',
        'recommendations_sewing_product_colors',

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
        'sewing_product.discount',
        'sewing_product.modifier',
        'sewing_product.type',
        'images',
        'categories',
        'colors',
        'sizes.id',
        'sizes.vendorCode',
        'sizes.size',
        'sizes.price',

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
        'recommendations_master_class_programs.programNameEn',
        'recommendations_master_class_programs.vendorCode',

        'recommendations_pattern_product.id',
        'recommendations_pattern_product.titleEn',
        'recommendations_pattern_product.type',
        'recommendations_pattern_product.modifier',
        'recommendations_pattern_product.complexity',
        'recommendations_pattern_product.discount',
        'recommendations_pattern_product_images',
        'recommendations_pattern_product_sizes.id',
        'recommendations_pattern_product_sizes.price',
        'recommendations_pattern_product_sizes.size',
        'recommendations_pattern_product_sizes.vendorCode',

        'recommendations_sewing_product.id',
        'recommendations_sewing_product.titleEn',
        'recommendations_sewing_product.discount',
        'recommendations_sewing_product.modifier',
        'recommendations_sewing_product.type',
        'recommendations_sewing_product_images',
        'recommendations_sewing_product_sizes.id',
        'recommendations_sewing_product_sizes.size',
        'recommendations_sewing_product_sizes.price',
        'recommendations_sewing_product_sizes.vendorCode',
        'recommendations_sewing_product_colors',

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
        'sewing_product.discount',
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
        'recommendations_master_class_programs.programNameRu',
        'recommendations_master_class_programs.vendorCode',
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
        'recommendations_pattern_product_sizes.size',
        'recommendations_pattern_product_sizes.vendorCode',
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
        'recommendations_sewing_product_sizes.vendorCode',
        'recommendations_sewing_product_colors',
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
        'sewing_product.discount',
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
        'recommendations_master_class_programs.programNameEn',
        'recommendations_master_class_programs.vendorCode',
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
        'recommendations_pattern_product_sizes.size',
        'recommendations_pattern_product_sizes.vendorCode',
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
        'recommendations_sewing_product_sizes.vendorCode',
        'recommendations_sewing_product_colors',
        'recommendations_sewing_product_like',

        'recommendations_post.id',
        'recommendations_post.titleEn',
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
      .where('sewing_product.id = :id', { id })
      .getOne();
  }

  async findPinnedRu(): Promise<SewingProductEntity[]> {
    return await this.createQueryBuilder('sewing_product')
      .leftJoin('sewing_product.images', 'images')
      .leftJoin('sewing_product.categories', 'categories')
      .leftJoin('sewing_product.sizes', 'sizes')
      .leftJoin('sewing_product.colors', 'colors')
      .select([
        'sewing_product.id',
        'sewing_product.titleRu',
        'sewing_product.discount',
        'sewing_product.modifier',
        'sewing_product.type',
        'images',
        'categories',
        'colors',
        'sizes.id',
        'sizes.size',
        'sizes.price',
        'sizes.vendorCode',
      ])
      .where('sewing_product.pinned = true')
      .andWhere('sewing_product.deleted = false')
      .getMany();
  }
  async findPinnedEn(): Promise<SewingProductEntity[]> {
    return await this.createQueryBuilder('sewing_product')
      .leftJoin('sewing_product.images', 'images')
      .leftJoin('sewing_product.categories', 'categories')
      .leftJoin('sewing_product.sizes', 'sizes')
      .leftJoin('sewing_product.colors', 'colors')
      .select([
        'sewing_product.id',
        'sewing_product.titleEn',
        'sewing_product.discount',
        'sewing_product.modifier',
        'sewing_product.type',
        'images',
        'categories',
        'colors',
        'sizes.id',
        'sizes.size',
        'sizes.price',
        'sizes.vendorCode',
      ])
      .where('sewing_product.pinned = true')
      .andWhere('sewing_product.deleted = false')
      .getMany();
  }
  async findPinnedRuAuth(userId: number): Promise<SewingProductEntity[]> {
    return await this.createQueryBuilder('sewing_product')
      .leftJoin('sewing_product.images', 'images')
      .leftJoin('sewing_product.categories', 'categories')
      .leftJoin('sewing_product.sizes', 'sizes')
      .leftJoin('sewing_product.colors', 'colors')
      .leftJoin('sewing_product.like', 'like', 'like.userId = :userId', {
        userId,
      })
      .select([
        'sewing_product.id',
        'sewing_product.titleRu',
        'sewing_product.discount',
        'sewing_product.modifier',
        'sewing_product.type',
        'images',
        'categories',
        'colors',
        'sizes.id',
        'sizes.size',
        'sizes.price',
        'sizes.vendorCode',
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
      .leftJoin('sewing_product.sizes', 'sizes')
      .leftJoin('sewing_product.colors', 'colors')
      .leftJoin('sewing_product.like', 'like', 'like.userId = :userId', {
        userId,
      })
      .select([
        'sewing_product.id',
        'sewing_product.titleEn',
        'sewing_product.discount',
        'sewing_product.modifier',
        'sewing_product.type',
        'images',
        'categories',
        'colors',
        'sizes.id',
        'sizes.size',
        'sizes.price',
        'sizes.vendorCode',
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
      .leftJoin('sewing_product.sizes', 'sizes')
      .leftJoin('sewing_product.colors', 'colors')
      .leftJoin('sewing_product.like', 'like')
      .select([
        'sewing_product.id',
        'sewing_product.titleRu',
        'sewing_product.discount',
        'sewing_product.modifier',
        'sewing_product.type',
        'images',
        'categories',
        'colors',
        'sizes.id',
        'sizes.size',
        'sizes.price',
        'sizes.vendorCode',
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
      .leftJoin('sewing_product.sizes', 'sizes')
      .leftJoin('sewing_product.colors', 'colors')
      .leftJoin('sewing_product.like', 'like')
      .select([
        'sewing_product.id',
        'sewing_product.titleEn',
        'sewing_product.discount',
        'sewing_product.modifier',
        'sewing_product.type',
        'images',
        'categories',
        'colors',
        'sizes.id',
        'sizes.size',
        'sizes.price',
        'sizes.vendorCode',
        'like',
      ])
      .where('sewing_product.deleted = false')
      .andWhere('like.userId = :userId', { userId })
      .getMany();
  }
}
