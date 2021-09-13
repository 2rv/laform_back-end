import { LikeEntity } from './like.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(LikeEntity)
export class LikeRepository extends Repository<LikeEntity> {
  async findUserLikes(userId: string): Promise<LikeEntity[]> {
    return await this.createQueryBuilder('like')
      .where('like.userId = :userId', { userId })
      .leftJoin('like.postId', 'post')
      .leftJoin('like.masterClassId', 'master_class')
      .leftJoin('like.sewingProductId', 'sewing_product')
      .leftJoin('like.patternProductId', 'pattern_product')

      .leftJoin('master_class.images', 'master_class_images')
      .leftJoin('master_class.programs', 'master_class_programs')
      .leftJoin('master_class.categories', 'master_class_categories')

      .leftJoin('pattern_product.images', 'pattern_product_images')
      .leftJoin('pattern_product.sizes', 'pattern_product_sizes')
      .leftJoin('pattern_product.categories', 'pattern_product_categories')

      .leftJoin('sewing_product.images', 'sewing_product_images')
      .leftJoin('sewing_product.sizes', 'sewing_product_sizes')
      .leftJoin('sewing_product.colors', 'sewing_product_colors')
      .leftJoin('sewing_product.categories', 'sewing_product_categories')

      .select([
        'like.id',

        'post.id',
        'post.titleRu',
        'post.createdDate',
        'post.modifier',
        'post.type',

        'master_class.id',
        'master_class.titleRu',
        'master_class.modifier',
        'master_class.discount',
        'master_class.type',
        'master_class_images',
        'master_class_programs',
        'master_class_categories',

        'pattern_product.id',
        'pattern_product.titleRu',
        'pattern_product.type',
        'pattern_product.modifier',
        'pattern_product.complexity',
        'pattern_product.price',
        'pattern_product.discount',
        'pattern_product_images',
        'pattern_product_sizes',
        'pattern_product_categories',

        'sewing_product.id',
        'sewing_product.titleRu',
        'sewing_product.discount',
        'sewing_product.modifier',
        'sewing_product.type',
        'sewing_product_images',
        'sewing_product_sizes',
        'sewing_product_colors',
        'sewing_product_categories',
      ])
      .getMany();
  }
}
