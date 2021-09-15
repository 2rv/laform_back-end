import { PatternProductEntity } from './pattern-product.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PatternProductEntity)
export class PatternProductRepository extends Repository<PatternProductEntity> {
  async findOneRu(id: string): Promise<PatternProductEntity> {
    return await this.createQueryBuilder('pattern_product')
      .where('pattern_product.id = :id', { id })
      .leftJoin('pattern_product.comment', 'comment')
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.sizes', 'sizes')
      .leftJoin('pattern_product.categories', 'categories')
      .leftJoin('pattern_product.filePdf', 'fildePdf')
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
        'user.login',
        'images',
        'sizes',
        'categories',
        'fildePdf',
      ])
      .getOne();
  }

  async findAllRu(size: number, page: number): Promise<PatternProductEntity[]> {
    const take = size || 100;
    const skip = (page - 1) * size || 0;
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.comment', 'comment')
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.sizes', 'sizes')
      .leftJoin('pattern_product.categories', 'categories')
      .leftJoin('pattern_product.filePdf', 'filePdf')
      .leftJoin('pattern_product.like', 'like')
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

  async findPinnedRu(): Promise<PatternProductEntity[]> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.comment', 'comment')
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .where('pattern_product.pinned = true')
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
        'user.login',
      ])
      .getMany();
  }

  async findOneEn(id: string): Promise<PatternProductEntity> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.comment', 'comment')
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .leftJoin('pattern_product.filePdf', 'fildePdf')
      .where('pattern_product.id = :id', { id })
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
        'user.login',
        'filePdf',
      ])
      .getOne();
  }

  async findAllEn(size: number, page: number): Promise<PatternProductEntity[]> {
    const take = size || 10;
    const skip = (page - 1) * size || 0;
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.comment', 'comment')
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .leftJoin('pattern_product.images', 'images')
      .leftJoin('pattern_product.sizes', 'sizes')
      .leftJoin('pattern_product.categories', 'categories')
      .leftJoin('pattern_product.filePdf', 'fildePdf')
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

  async findPinnedEn(): Promise<PatternProductEntity[]> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.comment', 'comment')
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .where('pattern_product.pinned = true')
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
        'user.login',
      ])
      .getMany();
  }
}
