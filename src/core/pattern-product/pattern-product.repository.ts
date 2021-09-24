import { PatternProductEntity } from './pattern-product.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PatternProductEntity)
export class PatternProductRepository extends Repository<PatternProductEntity> {
  async findAllRu(size: number, page: number): Promise<PatternProductEntity[]> {
    // const take = size || 100;
    // const skip = (page - 1) * size || 0;
    // .limit(take)
    // .offset(skip)
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
        'images',
        'sizes.id',
        'sizes.price',
        'categories',
      ])
      .where('pattern_product.deleted = false')
      .getMany();
  }
  async findAllRuAuth(
    size: number,
    page: number,
    userId: number,
  ): Promise<PatternProductEntity[]> {
    // const take = size || 100;
    // const skip = (page - 1) * size || 0;
    // .limit(take)
    // .offset(skip)
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
        'sizes',
        'categories',
        'like',
      ])
      .where('pattern_product.deleted = false')
      .getMany();
  }

  async findOneRu(id: string): Promise<PatternProductEntity> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.categories', 'categories')
      .leftJoin('pattern_product.sizes', 'sizes')
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
      ])
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
      ])
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
        'sizes.price',
      ])
      .where('pattern_product.deleted = false')
      .andWhere('pattern_product.pinned = true')
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
        'sizes.price',
        'like',
      ])
      .where('pattern_product.deleted = false')
      .andWhere('pattern_product.pinned = true')
      .getMany();
  }

  async findLikedRu(userId: number): Promise<PatternProductEntity[]> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.like', 'like')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.sizes', 'sizes')
      .leftJoin('pattern_product.categories', 'categories')
      .select([
        'pattern_product.id',
        'pattern_product.titleRu',
        'pattern_product.descriptionRu',
        'pattern_product.type',
        'pattern_product.modifier',
        'pattern_product.materialRu',
        'pattern_product.complexity',
        'pattern_product.discount',
        'like',
        'images',
        'sizes',
        'categories',
      ])
      .where('like.userId = :userId', { userId })
      .getMany();
  }

  async findOneEn(id: string): Promise<PatternProductEntity> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.categories', 'categories')
      .leftJoin('pattern_product.sizes', 'sizes')
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
      ])
      .where('pattern_product.id = :id', { id })
      .getOne();
  }
  async findAllEn(size: number, page: number): Promise<PatternProductEntity[]> {
    const take = size || 10;
    const skip = (page - 1) * size || 0;
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.sizes', 'sizes')
      .leftJoin('pattern_product.categories', 'categories')
      .leftJoin('pattern_product.like', 'like')
      .select([
        'pattern_product.id',
        'pattern_product.titleEn',
        'pattern_product.descriptionEn',
        'pattern_product.type',
        'pattern_product.modifier',
        'pattern_product.materialEn',
        'pattern_product.complexity',
        'pattern_product.discount',
        'like',
        'images',
        'sizes.id',
        'sizes.size',
        'sizes.price',
        'sizes.vendorCode',
        'categories',
      ])
      .where('pattern_product.deleted = false')
      .limit(take)
      .offset(skip)
      .getMany();
  }
  async findPinnedEn(): Promise<PatternProductEntity[]> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.sizes', 'sizes')
      .leftJoin('pattern_product.categories', 'categories')
      .leftJoin('pattern_product.like', 'like')
      .select([
        'pattern_product.id',
        'pattern_product.titleEn',
        'pattern_product.descriptionEn',
        'pattern_product.type',
        'pattern_product.modifier',
        'pattern_product.materialEn',
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
  async findOneEnAuth(
    id: string,
    userId: number,
  ): Promise<PatternProductEntity> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.comment', 'comment')
      .leftJoin('pattern_product.like', 'like')
      .where('like.userId = :userId', { userId })
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .select([
        'pattern_product.id',
        'like',
        'pattern_product.titleRu',
        'pattern_product.descriptionRu',
        'pattern_product.type',
        'pattern_product.modifier',
        'pattern_product.materialRu',
        'pattern_product.complexity',
        'pattern_product.discount',
        'comment',
        'userId.login',
        'subComment',
        'user.login',
      ])
      .where('pattern_product.id = :id', { id })
      .getOne();
  }
  async findAllEnAuth(
    size: number,
    page: number,
    userId: number,
  ): Promise<PatternProductEntity[]> {
    const take = size || 10;
    const skip = (page - 1) * size || 0;
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.comment', 'comment')
      .leftJoin('pattern_product.like', 'like')
      .where('like.userId = :userId', { userId })
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.sizes', 'sizes')
      .leftJoin('pattern_product.categories', 'categories')
      .select([
        'pattern_product.id',
        'like',
        'pattern_product.titleRu',
        'pattern_product.descriptionRu',
        'pattern_product.type',
        'pattern_product.modifier',
        'pattern_product.materialRu',
        'pattern_product.complexity',
        'pattern_product.discount',
        'comment',
        'userId.login',
        'subComment',
        'user.login',
        'images',
        'sizes',
        'categories',
      ])
      .where('pattern_product.deleted = false')
      .limit(take)
      .offset(skip)
      .getMany();
  }
  async findPinnedEnAuth(userId: number): Promise<PatternProductEntity[]> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.comment', 'comment')
      .leftJoin('pattern_product.like', 'like')
      .where('like.userId = :userId', { userId })
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .where('pattern_product.pinned = true')
      .select([
        'like',
        'pattern_product.id',
        'pattern_product.titleRu',
        'pattern_product.descriptionRu',
        'pattern_product.type',
        'pattern_product.modifier',
        'pattern_product.materialRu',
        'pattern_product.complexity',
        'pattern_product.discount',
        'comment',
        'userId.login',
        'subComment',
        'user.login',
      ])
      .getMany();
  }
  async findLikedEn(userId: number): Promise<PatternProductEntity[]> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.like', 'like')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.sizes', 'sizes')
      .leftJoin('pattern_product.categories', 'categories')
      .select([
        'pattern_product.id',
        'pattern_product.titleRu',
        'pattern_product.descriptionRu',
        'pattern_product.type',
        'pattern_product.modifier',
        'pattern_product.materialRu',
        'pattern_product.complexity',
        'pattern_product.discount',
        'like',
        'images',
        'sizes',
        'categories',
      ])
      .where('like.userId = :userId', { userId })
      .getMany();
  }
}
