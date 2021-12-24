import { PostEntity } from './post.entity';
import { EntityRepository, Repository } from 'typeorm';
import { recommendations } from '../recommendation/recommendation.select';
import {
  findAllPostParamsDto,
  findOnePostParamsDto,
} from './dto/post-find-params.dto';

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
  async findAll(params: findAllPostParamsDto): Promise<[PostEntity[], number]> {
    const { size, page, sort, by, where, category, lang, userId } = params;

    let query = await this.createQueryBuilder('post')
      .leftJoin('post.image', 'image')
      .leftJoin('post.categories', 'categories')
      .select([
        'post.id',
        'post.type',
        'post.titleRu',
        'post.modifierRu',
        'post.modifierColor',
        'post.createdDate',
        'post.vendorCode',
        'post.deleted',
        'post.inEnglish',
        'image',
        'categories.id',
        'categories.categoryNameRu',
      ])
      .take(size)
      .skip((page - 1) * size || 0)
      .orderBy(sort, by)

      .where('post.deleted = false')
      .andWhere('post.inEnglish = :lang', { lang: lang === 'en' });

    if (where) {
      query.andWhere('post.titleRu ILIKE :search', {
        search: `%${where}%`,
      });
    }

    if (category) {
      query.andWhere('categories.categoryNameRu = :category', {
        category: category,
      });
    }

    if (userId) {
      query.leftJoinAndSelect('post.like', 'like', 'like.userId = :userId', {
        userId,
      });
    }
    return await query.getManyAndCount();
  }

  async findOneProduct(params: findOnePostParamsDto): Promise<PostEntity> {
    const { id, userId } = params;
    let query = await this.createQueryBuilder('post')
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

      .select(
        [
          'post.id',
          'post.type',
          'post.titleRu',
          'post.modifierRu',
          'post.modifierColor',
          'post.articleRu',
          'post.createdDate',
          'post.vendorCode',
          'post.deleted',
          'post.inEnglish',
          'image',
          'categories.id',
          'categories.categoryNameRu',
        ].concat(recommendations),
      )
      .where('recommendations_sewing_product.deleted = false')
      .where('recommendations_master_class.deleted = false')
      .where('recommendations_pattern_product.deleted = false')
      .where('recommendations_post.deleted = false')

      .where('post.id = :id', { id })
      .andWhere('post.deleted = false');

    if (userId) {
      query
        .leftJoinAndSelect('post.like', 'like', 'like.userId = :userId', {
          userId,
        })
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
    params: findAllPostParamsDto,
  ): Promise<[PostEntity[], number]> {
    const { size, page, sort, by, where, category, lang, userId } = params;

    let query = await this.createQueryBuilder('post')
      .leftJoin('post.image', 'image')
      .leftJoin('post.categories', 'categories')
      .leftJoin('post.like', 'like', 'like.userId = :userId', {
        userId,
      })
      .select([
        'post.id',
        'post.type',
        'post.titleRu',
        'post.modifierRu',
        'post.modifierColor',
        'post.createdDate',
        'post.vendorCode',
        'post.deleted',
        'post.inEnglish',
        'image',
        'categories.id',
        'categories.categoryNameRu',
        'like',
      ])
      .take(size)
      .skip((page - 1) * size || 0)
      .orderBy(sort, by)

      .where('post.deleted = false')
      .andWhere('post.inEnglish = :lang', { lang: lang === 'en' })
      .andWhere('like.userId = :userId', { userId });

    if (where) {
      query.andWhere('post.titleRu ILIKE :search', {
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
    params: findAllPostParamsDto,
  ): Promise<[PostEntity[], number]> {
    const { size, page, sort, by, where, category, lang } = params;
    let query = await this.createQueryBuilder('post')
      .leftJoin('post.image', 'image')
      .leftJoin('post.categories', 'categories')
      .select([
        'post.id',
        'post.type',
        'post.titleRu',
        'post.modifierRu',
        'post.modifierColor',
        'post.createdDate',
        'post.vendorCode',
        'post.deleted',
        'post.inEnglish',
        'image',
        'categories.id',
        'categories.categoryNameRu',
      ])
      .orderBy(sort, by)
      .take(size)
      .skip((page - 1) * size || 0)

      .where('post.inEnglish = :lang', { lang: lang === 'en' });

    if (where) {
      query.andWhere('post.titleRu ILIKE :search', {
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
}
