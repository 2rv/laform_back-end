import { MasterClassEntity } from './master-class.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(MasterClassEntity)
export class MasterClassRepository extends Repository<MasterClassEntity> {
  async findAllRu(size: number, page: number): Promise<MasterClassEntity[]> {
    // const take = size || 100;
    // const skip = (page - 1) * size || 0;
    // .limit(take)
    // .offset(skip)
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.categories', 'categories')
      .leftJoin('master_class.programs', 'programs')
      .select([
        'master_class.id',
        'master_class.titleRu',
        'master_class.modifier',
        'master_class.discount',
        'master_class.type',
        'images',
        'categories',
        'programs.id',
        'programs.price',
      ])
      .where('master_class.deleted = false')
      .getMany();
  }
  async findAllRuAuth(
    size: number,
    page: number,
    userId: number,
  ): Promise<MasterClassEntity[]> {
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.categories', 'categories')
      .leftJoin('master_class.programs', 'programs')
      .leftJoin('master_class.like', 'like', 'like.userId = :userId', {
        userId,
      })
      .select([
        'master_class.id',
        'master_class.titleRu',
        'master_class.modifier',
        'master_class.discount',
        'master_class.type',
        'images',
        'categories',
        'programs.id',
        'programs.price',
        'like',
      ])
      .where('master_class.deleted = false')
      .getMany();
  }

  async findOneRu(id: string): Promise<MasterClassEntity> {
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.categories', 'categories')
      .leftJoin('master_class.programs', 'programs')
      .select([
        'master_class.id',
        'master_class.titleRu',
        'master_class.descriptionRu',
        'master_class.modifier',
        'master_class.discount',
        'master_class.type',
        'images',
        'categories',
        'programs.id',
        'programs.vendorCode',
        'programs.price',
        'programs.programNameRu',
      ])
      .where('master_class.id = :id', { id })
      .getOne();
  }
  async findOneRuAuth(id: string, userId: number): Promise<MasterClassEntity> {
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.categories', 'categories')
      .leftJoin('master_class.programs', 'programs')
      .leftJoin('master_class.like', 'like', 'like.userId = :userId', {
        userId,
      })
      .select([
        'master_class.id',
        'master_class.titleRu',
        'master_class.descriptionRu',
        'master_class.modifier',
        'master_class.discount',
        'master_class.type',
        'images',
        'categories',
        'programs.id',
        'programs.vendorCode',
        'programs.price',
        'programs.programNameRu',
        'like',
      ])
      .where('master_class.id = :id', { id })
      .getOne();
  }

  async findPinnedRu(): Promise<MasterClassEntity[]> {
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.categories', 'categories')
      .leftJoin('master_class.programs', 'programs')
      .select([
        'master_class.id',
        'master_class.titleRu',
        'master_class.modifier',
        'master_class.discount',
        'master_class.type',
        'master_class.pinned',
        'images',
        'categories',
        'programs.id',
        'programs.price',
      ])
      .where('master_class.pinned = true')
      .getMany();
  }
  async findPinnedRuAuth(userId: number): Promise<MasterClassEntity[]> {
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.categories', 'categories')
      .leftJoin('master_class.programs', 'programs')
      .leftJoin('master_class.like', 'like', 'like.userId = :userId', {
        userId,
      })
      .select([
        'master_class.id',
        'master_class.titleRu',
        'master_class.modifier',
        'master_class.discount',
        'master_class.type',
        'master_class.pinned',
        'images',
        'categories',
        'programs.id',
        'programs.price',
        'like',
      ])
      .where('master_class.pinned = true')
      .getMany();
  }

  async findLikedRu(userId: number): Promise<MasterClassEntity[]> {
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.like', 'like')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.categories', 'categories')
      .leftJoin('master_class.programs', 'programs')
      .select([
        'master_class.id',
        'master_class.titleRu',
        'master_class.descriptionRu',
        'master_class.modifier',
        'master_class.discount',
        'master_class.type',
        'master_class.pinned',
        'images',
        'categories',
        'programs',
        'like',
      ])
      .where('like.userId = :userId', { userId })
      .getMany();
  }

  async findOneEn(id: string): Promise<MasterClassEntity> {
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.comment', 'comment')
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.programs', 'programs')
      .leftJoin('master_class.categories', 'categories')
      .select([
        'master_class.id',
        'master_class.titleEn',
        'master_class.descriptionEn',
        'master_class.modifier',
        'master_class.discount',
        'master_class.type',
        'master_class.pinned',
        'comment',
        'userId.login',
        'subComment',
        'user.login',
        'images',
        'programs.id',
        'programs.vendorCode',
        'programs.price',
        'programs.programNameRu',
        'categories',
      ])
      .where('master_class.id = :id', { id })
      .getOne();
  }
  async findAllEn(size: number, page: number): Promise<MasterClassEntity[]> {
    const take = size || 10;
    const skip = (page - 1) * size || 0;
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.programs', 'programs')
      .leftJoin('master_class.categories', 'categories')
      .select([
        'master_class.id',
        'master_class.titleEn',
        'master_class.descriptionEn',
        'master_class.modifier',
        'master_class.discount',
        'master_class.type',
        'master_class.pinned',
        'images',
        'programs.id',
        'programs.vendorCode',
        'programs.price',
        'programs.programNameRu',
        'categories',
      ])
      .where('master_class.deleted = false')
      .limit(take)
      .offset(skip)
      .getMany();
  }
  async findPinnedEn(): Promise<MasterClassEntity[]> {
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.programs', 'programs')
      .leftJoin('master_class.categories', 'categories')
      .select([
        'master_class.id',
        'master_class.titleEn',
        'master_class.descriptionEn',
        'master_class.modifier',
        'master_class.discount',
        'master_class.type',
        'images',
        'categories',
        'programs.id',
        'programs.vendorCode',
        'programs.price',
        'programs.programNameRu',
        'master_class.pinned',
      ])
      .where('master_class.pinned = true')
      .getMany();
  }
  async findOneEnAuth(id: string, userId: number): Promise<MasterClassEntity> {
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.comment', 'comment')
      .leftJoin('master_class.like', 'like')
      .where('like.userId = :userId', { userId })
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .select([
        'master_class.id',
        'master_class.titleEn',
        'master_class.descriptionEn',
        'master_class.modifier',
        'master_class.discount',
        'master_class.type',
        'master_class.pinned',
        'comment',
        'userId.login',
        'subComment',
        'user.login',
        'like',
      ])
      .where('master_class.id = :id', { id })
      .getOne();
  }
  async findAllEnAuth(
    size: number,
    page: number,
    userId: number,
  ): Promise<MasterClassEntity[]> {
    const take = size || 10;
    const skip = (page - 1) * size || 0;
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.comment', 'comment')
      .leftJoin('master_class.like', 'like')
      .where('like.userId = :userId', { userId })
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.programs', 'programs')
      .leftJoin('master_class.categories', 'categories')
      .select([
        'master_class.id',
        'master_class.titleEn',
        'master_class.descriptionEn',
        'master_class.modifier',
        'master_class.discount',
        'master_class.type',
        'master_class.pinned',
        'comment',
        'userId.login',
        'subComment',
        'user.login',
        'images',
        'programs',
        'categories',
        'like',
      ])
      .where('master_class.deleted = false')
      .limit(take)
      .offset(skip)
      .getMany();
  }
  async findPinnedEnAuth(userId: number): Promise<MasterClassEntity[]> {
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.comment', 'comment')
      .leftJoin('master_class.like', 'like')
      .where('like.userId = :userId', { userId })
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .select([
        'master_class.id',
        'master_class.titleEn',
        'master_class.descriptionEn',
        'master_class.modifier',
        'master_class.discount',
        'master_class.type',
        'master_class.pinned',
        'comment',
        'userId.login',
        'subComment',
        'user.login',
        'like',
      ])
      .where('master_class.pinned = true')
      .getMany();
  }
  async findLikedEn(userId: number): Promise<MasterClassEntity[]> {
    return await this.createQueryBuilder('master_class')
      .leftJoin('master_class.like', 'like')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.categories', 'categories')
      .leftJoin('master_class.programs', 'programs')
      .select([
        'master_class.id',
        'master_class.titleEn',
        'master_class.descriptionEn',
        'master_class.modifier',
        'master_class.discount',
        'master_class.type',
        'master_class.pinned',
        'images',
        'categories',
        'programs',
        'like',
      ])
      .where('like.userId = :userId', { userId })
      .getMany();
  }
}
