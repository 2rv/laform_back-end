import { MasterClassEntity } from './master-class.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(MasterClassEntity)
export class MasterClassRepository extends Repository<MasterClassEntity> {
  async findOneRu(id: string): Promise<MasterClassEntity> {
    return await this.createQueryBuilder('master_class')
      .where('master_class.id = :id', { id })
      .select([
        'master_class.id',
        'master_class.titleRu',
        'master_class.descriptionRu',
        'master_class.price',
      ])
      .getOne();
  }

  async findAllRu(size: number, page: number): Promise<MasterClassEntity[]> {
    const take = size || 100;
    const skip = (page - 1) * size || 0;
    return await this.createQueryBuilder('master_class')
      .select([
        'master_class.id',
        'master_class.titleRu',
        'master_class.descriptionRu',
        'master_class.modifier',
        'master_class.discount',
        'master_class.type',
      ])
      .limit(take)
      .offset(skip)
      .getMany();
  }

  async findPinnedRu(): Promise<MasterClassEntity[]> {
    return await this.createQueryBuilder('master_class')
      .where('master_class.pinned = true')
      .select([
        'master_class.id',
        'master_class.titleRu',
        'master_class.descriptionRu',
      ])
      .getMany();
  }

  async findOneEn(id: string): Promise<MasterClassEntity> {
    return await this.createQueryBuilder('master_class')
      .where('master_class.id = :id', { id })
      .select([
        'master_class.id',
        'master_class.titleEn',
        'master_class.descriptionEn',
      ])
      .getOne();
  }

  async findAllEn(size: number, page: number): Promise<MasterClassEntity[]> {
    const take = size || 10;
    const skip = (page - 1) * size || 0;
    return await this.createQueryBuilder('master_class')
      .select([
        'master_class.id',
        'master_class.titleEn',
        'master_class.descriptionEn',
      ])
      .limit(take)
      .offset(skip)
      .getMany();
  }

  async findPinnedEn(): Promise<MasterClassEntity[]> {
    return await this.createQueryBuilder('master_class')
      .where('master_class.pinned = true')
      .select([
        'master_class.id',
        'master_class.titleEn',
        'master_class.descriptionEn',
      ])
      .getMany();
  }
}
