import { PatternProductEntity } from './pattern-product.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PatternProductEntity)
export class PatternProductRepository extends Repository<PatternProductEntity> {
  //UNAUTHTORIZED
  async findOneRu(id: string): Promise<PatternProductEntity> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.comment', 'comment')
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
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
        'images',
        'sizes.id',
        'sizes.size',
        'sizes.price',
        'sizes.vendorCode',
        'categories',
      ])
      .where('pattern_product.id = :id', { id })
      .getOne();
  }

  async findAllRu(size: number, page: number): Promise<PatternProductEntity[]> {
    const take = size || 100;
    const skip = (page - 1) * size || 0;
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.sizes', 'sizes')
      .leftJoin('pattern_product.categories', 'categories')
      .leftJoin('pattern_product.filePdf', 'filePdf')
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

  async findPinnedRu(): Promise<PatternProductEntity[]> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.sizes', 'sizes')
      .leftJoin('pattern_product.categories', 'categories')
      .leftJoin('pattern_product.like', 'like')
      .select([
        'pattern_product.id',
        'pattern_product.titleRu',
        'pattern_product.descriptionRu',
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

  async findOneEn(id: string): Promise<PatternProductEntity> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.sizes', 'sizes')
      .leftJoin('pattern_product.categories', 'categories')
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
        'sizes.id',
        'sizes.size',
        'sizes.price',
        'sizes.vendorCode',
        'categories',
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

  //AUTHTORIZED
  async findOneRuAuth(
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
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.sizes', 'sizes')
      .leftJoin('pattern_product.categories', 'categories')
      .leftJoin('pattern_product.filePdf', 'fildePdf')
      .select([
        'pattern_product.id',
        'like',
        'pattern_product.titleRu',
        'pattern_product.descriptionRu',
        'pattern_product.type',
        'pattern_product.modifier',
        'pattern_product.materialRu',
        'pattern_product.complexity',
        'pattern_product.price',
        'pattern_product.discount',
        'comment',
        'userId.login',
        'subComment',
        'user.login',
        'images',
        'sizes',
        'categories',
        'fildePdf',
      ])
      .where('pattern_product.id = :id', { id })
      .getOne();
  }

  async findAllRuAuth(
    size: number,
    page: number,
    userId: number,
  ): Promise<PatternProductEntity[]> {
    const take = size || 100;
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
      .leftJoin('pattern_product.filePdf', 'filePdf')
      .select([
        'pattern_product.id',
        'pattern_product.titleRu',
        'pattern_product.descriptionRu',
        'pattern_product.type',
        'pattern_product.modifier',
        'pattern_product.materialRu',
        'pattern_product.complexity',
        'pattern_product.price',
        'pattern_product.discount',
        'comment',
        'userId.login',
        'subComment',
        'like',
        'user.login',
        'images',
        'sizes',
        'categories',
        'filePdf',
      ])
      .where('pattern_product.deleted = false')
      .limit(take)
      .offset(skip)
      .getMany();
  }

  async findPinnedRuAuth(userId: number): Promise<PatternProductEntity[]> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.comment', 'comment')
      .leftJoin('pattern_product.like', 'like')
      .where('like.userId = :userId', { userId })
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .where('pattern_product.pinned = true')
      .select([
        'pattern_product.id',
        'like',
        'pattern_product.titleRu',
        'pattern_product.descriptionRu',
        'pattern_product.type',
        'pattern_product.modifier',
        'pattern_product.materialRu',
        'pattern_product.complexity',
        'pattern_product.price',
        'pattern_product.discount',
        'comment',
        'userId.login',
        'subComment',
        'user.login',
      ])
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
      .leftJoin('pattern_product.filePdf', 'fildePdf')
      .select([
        'pattern_product.id',
        'like',
        'pattern_product.titleRu',
        'pattern_product.descriptionRu',
        'pattern_product.type',
        'pattern_product.modifier',
        'pattern_product.materialRu',
        'pattern_product.complexity',
        'pattern_product.price',
        'pattern_product.discount',
        'comment',
        'userId.login',
        'subComment',
        'user.login',
        'filePdf',
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
      .leftJoin('pattern_product.filePdf', 'fildePdf')
      .select([
        'pattern_product.id',
        'like',
        'pattern_product.titleRu',
        'pattern_product.descriptionRu',
        'pattern_product.type',
        'pattern_product.modifier',
        'pattern_product.materialRu',
        'pattern_product.complexity',
        'pattern_product.price',
        'pattern_product.discount',
        'comment',
        'userId.login',
        'subComment',
        'user.login',
        'images',
        'sizes',
        'categories',
        'filePdf',
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
        'pattern_product.price',
        'pattern_product.discount',
        'comment',
        'userId.login',
        'subComment',
        'user.login',
      ])
      .getMany();
  }
}
