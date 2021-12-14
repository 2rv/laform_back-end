import { CategoryEntity } from './category.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(CategoryEntity)
export class CategoryRepository extends Repository<CategoryEntity> {
  async findOneRu(id: string): Promise<CategoryEntity> {
    return await this.createQueryBuilder('category')
      .where('category.id = :id', { id })
      .select(['category.id', 'category.categoryNameRu'])
      .getOne();
  }

  async findOneEn(id: string): Promise<CategoryEntity> {
    return await this.createQueryBuilder('category')
      .where('category.id = :id', { id })
      .select(['category.id', 'category.categoryNameEn'])
      .getOne()
      .catch((err) => {
        throw err;
      });
  }

  async findAllRu(type: string): Promise<CategoryEntity[]> {
    let query = await this.createQueryBuilder('category').select([
      'category.id',
      'category.categoryNameRu',
    ]);
    if (type === '1' || type === '2') {
      query.where('category.type = :type', { type: '2' });
    } else {
      query.where('category.type = :type', { type });
    }
    return await query.getMany();
  }

  async findAllEn(type: string): Promise<CategoryEntity[]> {
    let query = await this.createQueryBuilder('category').select([
      'category.id',
      'category.categoryNameEn',
    ]);
    if (type === '1' || type === '2') {
      query.where('category.type = :type', { type: '2' });
    } else {
      query.where('category.type = :type', { type });
    }
    return await query.getMany();
  }
}
