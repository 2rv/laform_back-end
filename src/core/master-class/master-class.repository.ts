import { MasterClassEntity } from './master-class.entity';
import { Brackets, EntityRepository, Repository } from 'typeorm';
import { recommendations } from '../recommendation/recommendation.select';
import {
  findAllMasterClassParamsDto,
  findOneMasterClassParamsDto,
} from './dto/master-class-find-params.dto';

@EntityRepository(MasterClassEntity)
export class MasterClassRepository extends Repository<MasterClassEntity> {
  async findAll(
    params: findAllMasterClassParamsDto,
  ): Promise<[MasterClassEntity[], number]> {
    const { size, page, sort, by, where, category, lang, userId } = params;

    let query = await this.createQueryBuilder('master_class')
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
        'master_class.deleted',
        'master_class.inEnglish',
        'master_class.clickCount',
        'images',
        'categories.id',
        'categories.categoryNameRu',
      ])
      .orderBy(sort, by)
      .take(size)
      .skip((page - 1) * size || 0)

      .where('master_class.deleted = false')
      .andWhere('master_class.inEnglish = :lang', { lang: lang === 'en' });

    if (where) {
      query.andWhere('master_class.titleRu ILIKE :search', {
        search: `%${where}%`,
      });
    }

    if (category) {
      query.andWhere('categories.categoryNameRu = :category', {
        category: category,
      });
    }

    if (userId) {
      query.leftJoinAndSelect(
        'master_class.like',
        'like',
        'like.userId = :userId',
        {
          userId,
        },
      );
    }
    return await query.getManyAndCount();
  }

  async findOneProduct(
    params: findOneMasterClassParamsDto,
  ): Promise<MasterClassEntity> {
    const { id, userId } = params;
    let query = await this.createQueryBuilder('master_class')
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

      .select(
        [
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
          'master_class.deleted',
          'images',
          'categories.id',
          'categories.categoryNameRu',
        ].concat(recommendations),
      )
      .where('master_class.id = :id', { id })
      .andWhere('master_class.deleted = false')
      .andWhere(
        new Brackets((qb) => {
          qb.where('rec_sewing_product.deleted = false')
            .orWhere('rec_master_class.deleted = false ')
            .orWhere('rec_pattern_product.deleted = false ')
            .orWhere('rec_post.deleted = false ');
        }),
      )
      .andWhere(
        new Brackets((qb) => {
          qb.where('rec_sewing_product.optionType = 0')
            .orWhere('rec_sewing_product_options.optionVisibility = true')
            .orWhere('rec_pattern_product.optionType = 0')
            .orWhere('rec_pattern_product_options.optionVisibility = true')
            .orWhere('rec_master_class.deleted = false')
            .orWhere('rec_post.deleted = false');
        }),
      );

    if (userId) {
      query
        .leftJoinAndSelect(
          'master_class.like',
          'like',
          'like.userId = :userId',
          {
            userId,
          },
        )
        .leftJoinAndSelect(
          'rec_master_class.like',
          'rec_master_class_like',
          'rec_master_class_like.userId = :userId',
          {
            userId,
          },
        )
        .leftJoinAndSelect(
          'rec_pattern_product.like',
          'rec_pattern_product_like',
          'rec_pattern_product_like.userId = :userId',
          {
            userId,
          },
        )
        .leftJoinAndSelect(
          'rec_sewing_product.like',
          'rec_sewing_product_like',
          'rec_sewing_product_like.userId = :userId',
          {
            userId,
          },
        )
        .leftJoinAndSelect(
          'rec_post.like',
          'rec_post_like',
          'rec_post_like.userId = :userId',
          {
            userId,
          },
        );
    }

    return await query.getOne();
  }

  async findLiked(
    params: findAllMasterClassParamsDto,
  ): Promise<[MasterClassEntity[], number]> {
    const { size, page, sort, by, where, category, lang, userId } = params;
    let query = await this.createQueryBuilder('master_class')
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
        'master_class.deleted',
        'master_class.inEnglish',
        'master_class.clickCount',
        'images',
        'categories.id',
        'categories.categoryNameRu',
        'like',
      ])
      .take(size)
      .skip((page - 1) * size || 0)
      .orderBy(sort, by)

      .where('master_class.deleted = false')
      .andWhere('master_class.inEnglish = :lang', { lang: lang === 'en' })
      .andWhere('like.userId = :userId', { userId });

    if (where) {
      query.andWhere('master_class.titleRu ILIKE :search', {
        search: `%${where}%`,
      });
    }

    if (category) {
      query.andWhere('categories.categoryNameRu = :category', {
        category: category,
      });
    }

    return await query.getManyAndCount();
  }

  async findAllForAdmin(
    params: findAllMasterClassParamsDto,
  ): Promise<[MasterClassEntity[], number]> {
    const { size, page, sort, by, where, category, lang } = params;
    let query = await this.createQueryBuilder('master_class')
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
        'master_class.deleted',
        'master_class.inEnglish',
        'master_class.clickCount',
        'images',
        'categories.id',
        'categories.categoryNameRu',
      ])
      .orderBy(sort, by)
      .take(size)
      .skip((page - 1) * size || 0)

      .where('master_class.inEnglish = :lang', { lang: lang === 'en' });

    if (where) {
      query.andWhere('master_class.titleRu ILIKE :search', {
        search: `%${where}%`,
      });
    }

    if (category) {
      query.andWhere('categories.categoryNameRu = :category', {
        category: category,
      });
    }

    return await query.getManyAndCount();
  }

  async getOneForAdmin(id: string): Promise<MasterClassEntity> {
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

      .select(
        [
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
          'master_class.deleted',
          'master_class.inEnglish',
          'images',
          'categories.id',
          'categories.categoryNameRu',
        ].concat(recommendations),
      )

      .where('master_class.id = :id', { id })

      .getOne();
  }
}
