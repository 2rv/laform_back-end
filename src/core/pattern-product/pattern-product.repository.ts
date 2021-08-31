import { PatternProductEntity } from './pattern-product.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PatternProductEntity)
export class PatternProductRepository extends Repository<PatternProductEntity> {
  async findOneRu(id: string): Promise<PatternProductEntity> {
    return await this.createQueryBuilder('pattern_product')
      .leftJoin('pattern_product.comment', 'comment')
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .where('pattern_product.id = :id', { id })
      .select([
        'pattern_product.id',
        'pattern_product.titleRu',
        'pattern_product.descriptionRu',
        'pattern_product.discount',
        'pattern_product.modifier',
        'pattern_product.type',
        'pattern_product.price',
        'pattern_product.complexity',
        'comment',
        'userId.login',
        'subComment',
        'user.login',
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
