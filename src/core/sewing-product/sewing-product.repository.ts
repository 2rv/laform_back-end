import { SewingProductEntity } from './sewing-product.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(SewingProductEntity)
export class SewingProductRepository extends Repository<SewingProductEntity> {
  async findAllRu(size: number, page: number): Promise<SewingProductEntity[]> {
    // const take = size || 200;
    // const skip = (page - 1) * size || 0;
    // .limit(take)
    // .offset(skip)
    return await this.createQueryBuilder('sewing_product')
      .leftJoin('sewing_product.images', 'images')
      .leftJoin('sewing_product.categories', 'categories')
      .leftJoin('sewing_product.sizes', 'sizes')
      .select([
        'sewing_product.id',
        'sewing_product.titleRu',
        'sewing_product.discount',
        'sewing_product.modifier',
        'sewing_product.type',
        'images',
        'categories',
        'sizes.id',
        'sizes.size',
        'sizes.price',
      ])
      .where('sewing_product.deleted = false')
      .getMany();
  }
  async findAllRuAuth(
    size: number,
    page: number,
    userId: number,
  ): Promise<SewingProductEntity[]> {
    // const take = size || 100;
    // const skip = (page - 1) * size || 0;
    // .limit(take)
    // .offset(skip)
    return await this.createQueryBuilder('sewing_product')
      .leftJoin('sewing_product.images', 'images')
      .leftJoin('sewing_product.categories', 'categories')
      .leftJoin('sewing_product.sizes', 'sizes')
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
        'sizes.id',
        'sizes.size',
        'sizes.price',
        'like',
      ])
      .where('sewing_product.deleted = false')
      .getMany();
  }

  async findOneRu(id: string): Promise<SewingProductEntity> {
    return await this.createQueryBuilder('sewing_product')
      .leftJoin('sewing_product.images', 'images')
      .leftJoin('sewing_product.categories', 'categories')
      .leftJoin('sewing_product.colors', 'colors')
      .leftJoin('sewing_product.sizes', 'sizes')
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
        'sizes.count',
        'sizes.size',
        'sizes.price',
      ])
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
        'sizes.count',
        'sizes.size',
        'sizes.price',
        'like',
      ])
      .where('sewing_product.id = :id', { id })
      .getOne();
  }

  async findPinnedRu(): Promise<SewingProductEntity[]> {
    return await this.createQueryBuilder('sewing_product')
      .leftJoin('sewing_product.images', 'images')
      .leftJoin('sewing_product.categories', 'categories')
      .leftJoin('sewing_product.sizes', 'sizes')
      .select([
        'sewing_product.id',
        'sewing_product.titleRu',
        'sewing_product.discount',
        'sewing_product.modifier',
        'sewing_product.type',
        'images',
        'categories',
        'sizes.id',
        'sizes.size',
        'sizes.price',
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
        'sizes.id',
        'sizes.size',
        'sizes.price',
        'like',
      ])
      .where('sewing_product.pinned = true')
      .andWhere('sewing_product.deleted = false')
      .getMany();
  }

  async findLikedRu(userId: number): Promise<SewingProductEntity[]> {
    return await this.createQueryBuilder('sewing_product')
      .leftJoin('sewing_product.like', 'like')
      .leftJoin('sewing_product.images', 'images')
      .leftJoin('sewing_product.sizes', 'sizes')
      .leftJoin('sewing_product.colors', 'colors')
      .leftJoin('sewing_product.categories', 'categories')
      .select([
        'sewing_product.id',
        'sewing_product.titleRu',
        'sewing_product.descriptionRu',
        'sewing_product.discount',
        'sewing_product.modifier',
        'sewing_product.type',
        'like',
        'images',
        'sizes',
        'colors',
        'categories',
      ])
      .where('like.userId = :userId', { userId })
      .getMany();
  }

  async findOneEn(id: string): Promise<SewingProductEntity> {
    return await this.createQueryBuilder('sewing_product')
      .leftJoin('sewing_product.comment', 'comment')
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .select([
        'sewing_product.id',
        'sewing_product.titleEn',
        'sewing_product.descriptionEn',
        'sewing_product.discount',
        'sewing_product.modifier',
        'sewing_product.type',
        'sewing_product.pinned',
        'comment',
        'userId.login',
        'subComment',
        'user.login',
      ])
      .where('sewing_product.id = :id', { id })
      .getOne();
  }
  async findAllEn(size: number, page: number): Promise<SewingProductEntity[]> {
    const take = size || 10;
    const skip = (page - 1) * size || 0;
    return await this.createQueryBuilder('sewing_product')
      .leftJoin('sewing_product.comment', 'comment')
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .leftJoin('sewing_product.images', 'images')
      .leftJoin('sewing_product.sizes', 'sizes')
      .leftJoin('sewing_product.colors', 'colors')
      .leftJoin('sewing_product.categories', 'categories')
      .select([
        'sewing_product.id',
        'sewing_product.titleEn',
        'sewing_product.descriptionEn',
        'sewing_product.discount',
        'sewing_product.modifier',
        'sewing_product.type',
        'sewing_product.pinned',
        'comment',
        'userId.login',
        'subComment',
        'user.login',
        'images',
        'sizes',
        'colors',
        'categories',
      ])
      .where('sewing_product.deleted = false')
      .limit(take)
      .offset(skip)
      .getMany();
  }
  async findPinnedEn(): Promise<SewingProductEntity[]> {
    return await this.createQueryBuilder('sewing_product')
      .leftJoin('sewing_product.images', 'images')
      .leftJoin('sewing_product.comment', 'comment')
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .where('sewing_product.pinned = true')
      .select([
        'sewing_product.id',
        'sewing_product.titleEn',
        'sewing_product.descriptionEn',
        'sewing_product.discount',
        'sewing_product.modifier',
        'sewing_product.type',
        'sewing_product.pinned',
        'comment',
        'userId.login',
        'subComment',
        'user.login',
        'images',
      ])
      .getMany();
  }
  async findOneEnAuth(
    id: string,
    userId: number,
  ): Promise<SewingProductEntity> {
    return await this.createQueryBuilder('sewing_product')
      .leftJoin('sewing_product.comment', 'comment')
      .leftJoin('sewing_product.like', 'like')
      .where('like.userId = :userId', { userId })
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .select([
        'sewing_product.id',
        'like',
        'sewing_product.titleEn',
        'sewing_product.descriptionEn',
        'sewing_product.discount',
        'sewing_product.modifier',
        'sewing_product.type',
        'sewing_product.count',
        'sewing_product.pinned',
        'comment',
        'userId.login',
        'subComment',
        'user.login',
      ])
      .where('sewing_product.id = :id', { id })
      .getOne();
  }
  async findAllEnAuth(
    size: number,
    page: number,
    userId: number,
  ): Promise<SewingProductEntity[]> {
    const take = size || 10;
    const skip = (page - 1) * size || 0;
    return await this.createQueryBuilder('sewing_product')
      .leftJoin('sewing_product.comment', 'comment')
      .leftJoin('sewing_product.like', 'like')
      .where('like.userId = :userId', { userId })
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .leftJoin('sewing_product.images', 'images')
      .leftJoin('sewing_product.sizes', 'sizes')
      .leftJoin('sewing_product.colors', 'colors')
      .leftJoin('sewing_product.categories', 'categories')
      .select([
        'sewing_product.id',
        'like',
        'sewing_product.titleEn',
        'sewing_product.descriptionEn',
        'sewing_product.discount',
        'sewing_product.modifier',
        'sewing_product.type',
        'sewing_product.count',
        'sewing_product.pinned',
        'comment',
        'userId.login',
        'subComment',
        'user.login',
        'images',
        'sizes',
        'colors',
        'categories',
      ])
      .where('sewing_product.deleted = false')
      .limit(take)
      .offset(skip)
      .getMany();
  }
  async findPinnedEnAuth(userId: number): Promise<SewingProductEntity[]> {
    return await this.createQueryBuilder('sewing_product')
      .leftJoin('sewing_product.like', 'like')
      .where('like.userId = :userId', { userId })
      .leftJoin('sewing_product.comment', 'comment')
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .select([
        'like',
        'sewing_product.id',
        'sewing_product.titleEn',
        'sewing_product.descriptionEn',
        'sewing_product.discount',
        'sewing_product.modifier',
        'sewing_product.type',
        'sewing_product.count',
        'sewing_product.pinned',
        'comment',
        'userId.login',
        'subComment',
        'user.login',
      ])
      .where('sewing_product.pinned = true')
      .getMany();
  }
  async findLikedEn(userId: number): Promise<SewingProductEntity[]> {
    return await this.createQueryBuilder('sewing_product')
      .leftJoin('sewing_product.like', 'like')
      .leftJoin('sewing_product.images', 'images')
      .leftJoin('sewing_product.sizes', 'sizes')
      .leftJoin('sewing_product.colors', 'colors')
      .leftJoin('sewing_product.categories', 'categories')
      .select([
        'sewing_product.id',
        'sewing_product.titleEn',
        'sewing_product.descriptionEn',
        'sewing_product.discount',
        'sewing_product.modifier',
        'sewing_product.type',
        'like',
        'images',
        'sizes',
        'colors',
        'categories',
      ])
      .where('like.userId = :userId', { userId })
      .getMany();
  }
}
