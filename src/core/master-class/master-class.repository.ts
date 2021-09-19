import { MasterClassEntity } from './master-class.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(MasterClassEntity)
export class MasterClassRepository extends Repository<MasterClassEntity> {
  async findOneRu(id: string): Promise<MasterClassEntity> {
    return await this.createQueryBuilder('master_class')
      .where('master_class.id = :id', { id })
      .leftJoin('master_class.comment', 'comment')
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.programs', 'programs')
      .leftJoin('master_class.categories', 'categories')
      .select([
        'master_class.id',
        'master_class.titleRu',
        'master_class.descriptionRu',
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
      .getOne();
  }

  async findAllRu(size: number, page: number): Promise<MasterClassEntity[]> {
    const take = size || 100;
    const skip = (page - 1) * size || 0;
    return await this.createQueryBuilder('master_class')
      .where('master_class.deleted = false')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.programs', 'programs')
      .leftJoin('master_class.categories', 'categories')
      .select([
        'master_class.id',
        'master_class.titleRu',
        'master_class.descriptionRu',
        'master_class.modifier',
        'master_class.discount',
        'master_class.pinned',
        'master_class.type',
        'images',
        'categories',
        'programs.id',
        'programs.vendorCode',
        'programs.price',
        'programs.programNameRu',
      ])
      .limit(take)
      .offset(skip)
      .getMany();
  }

  async findPinnedRu(): Promise<MasterClassEntity[]> {
    return await this.createQueryBuilder('master_class')
      .where('master_class.pinned = true')
      .leftJoin('master_class.images', 'images')
      .leftJoin('master_class.programs', 'programs')
      .leftJoin('master_class.categories', 'categories')
      .select([
        'master_class.id',
        'master_class.titleRu',
        'master_class.descriptionRu',
        'master_class.modifier',
        'master_class.pinned',
        'master_class.discount',
        'master_class.type',
        'images',
        'categories',
        'programs.id',
        'programs.vendorCode',
        'programs.price',
        'programs.programNameRu',
      ])
      .getMany();
  }

  async findOneEn(id: string): Promise<MasterClassEntity> {
    return await this.createQueryBuilder('master_class')
      .where('master_class.id = :id', { id })
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
      .where('master_class.pinned = true')
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
      .getMany();
  }
}
